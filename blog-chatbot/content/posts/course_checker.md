---
title: "course checker"
date: 2024-03-13T23:54:20+08:00
draft: false
tags: ["tricks", "CS"]

---

The wild world of course registration heats up during the last round of selection, where occasionally seats are released due to dropouts and the remaining dash for the vacancy. But what if I told you there's a clever way to outsmart the system? No more frantic refreshing, here's nifty little program I concocted that plays the waiting game for you. It keeps an eagle eye on course availability and sends you an email the moment a spot opens up.

Remarks: required packages are all common packages available online, and can be conveniently installed using pip or conda anyway. Still, the version of Chromedriver and Chrome needs to pay extra attention. Also, one might need to adjust the login-click target xpaths based on the website logic, since it's a simulation of human actions.

```python
"""
updated Mar. 2024
need to mind chrome version
current ver.: 122.0.6261.94
added send_email option
"""

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import smtplib
from email.mime.text import MIMEText

# Define the login URL, your credentials, and the target URL
login_url = "https://eams.sufe.edu.cn/eams/login.action"
username = "school_id"
password = "corresponding password"
target_url = "https://eams.sufe.edu.cn/eams/allTeachTaskSearch!info.action?removeBack=1&lesson.id=352822"

# Email configuration for sending notifications
mail_host = "smtphz.qiye.163.com"
port = 25
send_by = "school_email@stu.sufe.edu.cn"
send_to = "target_email"
email_password = "email_password"

def send_email(title, content, password):
    """Sends an email notification with the specified title and content."""
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
        smtp.quit()
    except smtplib.SMTPException as e:
        print("Send failed", e)
        if 'smtp' in locals() and smtp:
            smtp.quit()
        raise

# Selenium WebDriver configuration
driver = webdriver.Chrome()  # You may need to specify the path to your ChromeDriver executable
driver.get(login_url)

# Login process
id_xpath = "//*[@id='username']/div/div[1]/div[1]/div/input"
pwd_xpath = "//*[@id='username']/div/div[2]/div[1]/div/input"
login_button_xpath = "/html/body/div/div[1]/div[2]/div[3]/div[4]/div[2]/div/button"

id_box = driver.find_element(By.XPATH, id_xpath)
id_box.send_keys(username)
pwd_box = driver.find_element(By.XPATH, pwd_xpath)
pwd_box.send_keys(password)

login_button = driver.find_element(By.XPATH, login_button_xpath)
login_button.click()

# Wait for the page to load
time.sleep(10)

# Main loop to check course availability
count = 10
while True:
    driver.refresh()
    time.sleep(5)
    slt = "body > table > tbody > tr:nth-child(13) > td:nth-child(4)"
    element = driver.find_element(By.CSS_SELECTOR, slt)
    if int(element.text) <= 53:
        print("Element is less than 54!")
        get_it = "https://eams.sufe.edu.cn/eams/stdElectCourse!defaultPage.action?electionProfile.id=8585"
        driver.get(get_it)
        while True:
            time.sleep(10)
            print("attention!!!")
            print("Element is less than 54!")
            send_email("course selection available", "select course now", email_password)
    else:
        if count == 0:
            count = 10
            print("Element is not less than 54.")
        count -= 1
```

