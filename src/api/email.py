import os
import smtplib
from email.message import EmailMessage
import json

try:
    import requests
except Exception:
    requests = None


def send_email(to_email, subject, text_body, html_body=None, from_email=None):
    """Envía un email usando la primera opción disponible en el entorno:
    1) Mailgun (MAILGUN_API_KEY + MAILGUN_DOMAIN)
    2) SendGrid (SENDGRID_API_KEY)
    3) SMTP (SMTP_SERVER + SMTP_PORT + SMTP_USER + SMTP_PASSWORD) — soporta MailHog si se configura

    Devuelve (True, None) en éxito, o (False, error_message) en fallo.
    """
    # Normalizar remitente
    from_email = from_email or os.getenv('SMTP_FROM') or os.getenv('SMTP_USER')

    # 1) Mailgun
    mg_key = os.getenv('MAILGUN_API_KEY')
    mg_domain = os.getenv('MAILGUN_DOMAIN')
    if mg_key and mg_domain:
        if requests is None:
            return False, "requests no instalado (necesario para Mailgun)"
        try:
            resp = requests.post(
                f'https://api.mailgun.net/v3/{mg_domain}/messages',
                auth=('api', mg_key),
                data={
                    'from': from_email or f'no-reply@{mg_domain}',
                    'to': to_email,
                    'subject': subject,
                    'text': text_body,
                    'html': html_body or text_body,
                },
                timeout=10,
            )
            if resp.status_code in (200, 202):
                return True, None
            return False, f"Mailgun error: {resp.status_code} {resp.text}"
        except Exception as e:
            return False, str(e)

    # 2) SendGrid
    sg_key = os.getenv('SENDGRID_API_KEY')
    if sg_key:
        if requests is None:
            return False, "requests no instalado (necesario para SendGrid)"
        try:
            payload = {
                "personalizations": [{"to": [{"email": to_email}]}],
                "from": {"email": from_email or os.getenv('MAIL_FROM') or 'no-reply@example.com'},
                "subject": subject,
                "content": [{"type": "text/plain", "value": text_body}],
            }
            if html_body:
                payload["content"] = [
                    {"type": "text/html", "value": html_body}]

            headers = {"Authorization": f"Bearer {sg_key}",
                       "Content-Type": "application/json"}
            resp = requests.post('https://api.sendgrid.com/v3/mail/send',
                                 headers=headers, data=json.dumps(payload), timeout=10)
            if resp.status_code in (200, 202):
                return True, None
            return False, f"SendGrid error: {resp.status_code} {resp.text}"
        except Exception as e:
            return False, str(e)

    # 3) SMTP (incluye MailHog si así lo configuras)
    smtp_server = os.getenv('SMTP_SERVER')
    smtp_port = os.getenv('SMTP_PORT')
    smtp_user = os.getenv('SMTP_USER')
    smtp_password = os.getenv('SMTP_PASSWORD')

    if not smtp_server or not smtp_port:
        return False, 'No hay método de envío configurado (Mailgun/SendGrid/SMTP)'

    try:
        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = from_email or smtp_user or 'no-reply@example.com'
        msg['To'] = to_email
        msg.set_content(text_body)
        if html_body:
            msg.add_alternative(html_body, subtype='html')

        server = smtplib.SMTP(smtp_server, int(smtp_port), timeout=10)
        # Si el puerto es 1025 (MailHog) o no tenemos credenciales, no iniciar TLS/login
        no_auth = os.getenv('MAILHOG', '0') == '1' or smtp_port == '1025' or not (
            smtp_user and smtp_password)
        if not no_auth:
            try:
                server.starttls()
            except Exception:
                pass
            server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        return True, None
    except Exception as e:
        return False, str(e)
