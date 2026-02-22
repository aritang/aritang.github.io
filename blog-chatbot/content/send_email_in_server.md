---
title: "the code that can send email in linux server"
date: 2023-11-05T20:16:21+08:00
draft: false
tags: ["tricks", "CS"]
---

I often encounter a recurring issue when running projects on a remote server and trying to collect data afterward. The setup in my `run_script.sh` usually includes a line for sending emails once the job is done.

```shell
#!/bin/bash
#BSUB -J StockTraderTestRun         # Set the job name to StockTraderTestRun
#BSUB -q gpu                        # Submit to the long queue
#BSUB -o /nfsshare/home/tang/StockTrader/%J.out  # Standard output file
#BSUB -e /nfsshare/home/tang/StockTrader/%J.err  # Standard error file
#BSUB -N                                     # Send email at job finish
#BSUB -u ariana_tang@outlook.com # Set your email address

# Change directory to where the main.py script is located
# Execute the main.py script
cd /nfsshare/home/tang/StockTrader/StockTradingDRL_upload/
python /nfsshare/home/tang/StockTrader/StockTradingDRL_upload/main.py novel_lstm_positive
```

But here’s the rub: the email dispatch never functions as intended. There’s a subtle irony in how my efforts to debug are commensurate with the perceived benefits of receiving an email notification post-job completion. Admittedly, I’ve been somewhat negligent, routinely plugging in the line `#BSUB -u ariana_tang@outlook.com # Set your email address` and occasionally altering the address, half-hoping for a spontaneous fix.

Yet the coveted "congratulations, model successfully trained" email has never arrived. Accepting that the solution won’t materialize out of thin air, I decided to confront the issue directly. I’ve refined a Python code snippet that reliably sends emails and can be incorporated into the shell script to signal the end of a run.

```python
import smtplib
from email.mime.text import MIMEText
import sys

mail_host = "smtphz.qiye.163.com"
port = 25
send_by = "2021121597@stu.sufe.edu.cn"
password = "fill_in_yours"
send_to = "ariana_tang@outlook.com"

def send_email(title, content, password):
    message = MIMEText(content, 'plain', 'utf-8')
    message["From"] = send_by
    message['To'] = send_to
    message['Subject'] = title
    try:
        smtp = smtplib.SMTP(mail_host, port)
        smtp.ehlo()  # Identify yourself to the server
        smtp.starttls()  # Secure the connection
        smtp.login(send_by, password)
        smtp.sendmail(send_by, send_to, message.as_string())
        print("Sent successfully")
    except smtplib.SMTPException as e:
        print("Send failed", e)
    finally:
        smtp.quit()  # Ensure the connection is closed in any case

def main():
    title = sys.argv[1]  # Accept the first input parameter
    content = sys.argv[2]  # Accept the second input parameter
    send_email(title, content, password)

if __name__ == "__main__":
    main()
```

In a rather anti-climactic revelation, it took just thirty minutes to iron out the kinks—time I might have saved had I not been creatively dodging the task. It’s a small testament to the classic researcher’s plight: sometimes the simplest problems require just a bit of straightforward attention.
