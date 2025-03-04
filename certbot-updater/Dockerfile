FROM certbot/certbot:latest

RUN apk add --no-cache bash

COPY renew_cert.sh /usr/local/bin/renew_cert.sh

RUN chmod +x /usr/local/bin/renew_cert.sh

ENTRYPOINT ["/usr/local/bin/renew_cert.sh"]
