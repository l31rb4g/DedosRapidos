#!/usr/bin/python
import unittest
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains


class DedosRapidosTests(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Chrome()
        self.browser.maximize_window()
    
    def test_start_button_exists(self):
        self.browser.get('http://localhost:8080')
        el = self.browser.find_element_by_tag_name('button')
        sleep(1)
        self.assertIn('Start', el.text)
        self.browser.quit()

    def test_game_3_or_more_bombs(self):
        self.browser.get('http://localhost:8080')
        el = self.browser.find_element_by_tag_name('button')
        sleep(1)
        el.click()
        sleep(3)
        qtd = len(self.browser.find_elements_by_css_selector('.square'))
        self.assertGreaterEqual(qtd, 3)
        self.browser.quit()

    def test_score(self):
        self.browser.get('http://localhost:8080')
        el = self.browser.find_element_by_tag_name('button')
        sleep(1)
        el.click()
        sleep(3)
        for el in self.browser.find_elements_by_css_selector('.square'):
            ActionChains(self.browser).send_keys(el.text).perform()
        sleep(1)
        score = int(self.browser.find_element_by_css_selector('.sc').text)
        self.assertGreaterEqual(score, 3)
        self.browser.quit()


if __name__ == '__main__':
    unittest.main(verbosity=2)
