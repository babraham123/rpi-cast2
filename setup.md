## Google Chrome headless automation
Good for ubuntu 14.04 TLS
Chrome needed for flash support. Other options include chromium, firefox, and phantomjs

Install chrome
```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y libxss1 libappindicator1 libindicator7
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-*.deb
sudo apt-get -f install
```

Install chrome driver
```bash
sudo apt-get install -f unzip
wget -N http://chromedriver.storage.googleapis.com/2.20/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
chmod +x chromedriver
sudo mv -f chromedriver /usr/local/share/chromedriver
sudo ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
sudo ln -s /usr/local/share/chromedriver /usr/bin/chromedriver
```

Get python packages
```bash
sudo apt-get install -f xvfb python-pip
pip install pyvirtualdisplay selenium
```

Test and begin scrapping

Xvfb and selenium example
```python
from pyvirtualdisplay import Display
from selenium import webdriver 
display = Display(visible=0, size=(800, 600))
display.start()
browser = webdriver.Firefox()
browser.get('http://www.google.com')
print browser.title
browser.quit()
display.stop()
```

Selenium example that prints console.log
```python
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities    
# enable browser logging
d = DesiredCapabilities.CHROME
d['loggingPrefs'] = { 'browser':'ALL' }
driver = webdriver.Chrome(desired_capabilities=d)
# load some site
driver.get('http://foo.com')
# print messages
for entry in driver.get_log('browser'):
    print entry
```
