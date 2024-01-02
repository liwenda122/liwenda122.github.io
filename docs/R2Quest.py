# -*- coding: GBK -*-
#! /usr/bin/env python
# coding=gbk
#pip install pypiwin32 -i https://pypi.tuna.tsinghua.edu.cn/simple/
# 2024 01 02 BY 山东大汉 于 河南郑州
# 阿克拉鹰 BOSS刷新助手
import pythoncom
import win32com.client
import threading
#微信消息发送方法开始
# usage: send message via wechat
import requests, sys, json, os, io, time
import urllib3
from datetime import datetime, timedelta
urllib3.disable_warnings()
reload(sys)
#重新设置字符集 否则会出现中文消息乱码
sys.setdefaultencoding("utf-8")
###企业微信参数###
# Corpid是企业号的标识
Corpid = "wwa4fc311ea775d93e"
# Secret是管理组凭证密钥-BOSS刷新助手
Secret = "cDJFOC0TWCcdFKf4DMl_0BX4GD_URzJHwcYBYmpUkoo"
# 应用ID-BOSS刷新助手
Agentid = "1000007"
# token_config文件放置路径
if getattr(sys, "frozen", False):
    # The application is frozen
    datadir = os.path.dirname(sys.executable)
else:
    # The application is not frozen
    # Change this bit to match where you store your data files:
    datadir = os.path.dirname(__file__)
Token_config = os.path.join(datadir, "token_config.json")
Quest_config = os.path.join(pathDir,"quest_config.json")
# 战区配置文件war_config文件放置路径
#War_config = os.path.join(datadir,"war_config.json")
# 先从企业微信服务器获取token,然后保存到本地
def GetTokenFromServer(Corpid, Secret):
    """获取access_token"""
    try:
        Url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken"
        Data = {
            "corpid": Corpid,
            "corpsecret": Secret
        }
    	proxies = {'https': '127.0.0.1:10809'}
    	r = requests.get(url=Url, params=Data, verify=False)
        #print(r.json())
        if r.json()['errcode'] != 0:
            return False
        else:
            #第一次调用和token过期后，都会再次获取新的token并保存起来
            Token = r.json()['access_token']
            file = io.open(Token_config, 'w', encoding='utf-8')
            file.write(r.text)
            file.close()
            return Token
    except:
        Log('Network Error cannot get token')
        return False
def SendMessage(Content):
    """发送消息"""
    # 获取token信息
    try:
        file = io.open(Token_config, 'r', encoding='utf-8')
        Token = json.load(file)['access_token']
        file.close()
    except:
        #Token为空 或者 Token 已经过期，从服务器重新获取
        Token = GetTokenFromServer(Corpid, Secret)
    # Partyid 2=海盗2战区 8=六月平台 9=山风平台 10=马蛋点 11 水母暗杀组 12任务小秘书 7美国战区 13 德莫尔侦查连 15德莫尔鹰2.0 21-BOSS刷新助手
    Partyid = "21"
    Subject = '阿克拉鹰,'
    Subject = Subject.decode('gbk')
    # Content ='轮子哥 遇到玩家攻击回城, 请注意查看'
    # sEncodeContent = quote(Content.encode('utf-8').decode('utf-8'))
    # sEncodeSubject = quote(Subject.encode('utf-8').decode('utf-8'))
    # 发送消息
    Url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s" % Token
    Data = {
        "toparty": Partyid,
        "msgtype": "text",
        "agentid": Agentid,
        "text": {"content": Subject + Content},
        "safe": "0"
    }
    # ensure_ascii=False 防止中文乱码
    try:
        DataJSON = json.dumps(Data)
        proxies = {'https': '127.0.0.1:10809'}
        r = requests.post(url=Url, data=DataJSON, verify=False)

        # 如果发送失败，将重试2次
        n = 1
        while r.json()['errcode'] != 0 and n < 3:
            n = n + 1
            Token = GetTokenFromServer(Corpid, Secret)
            if Token:
                Url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s" % Token
                r = requests.post(url=Url, data=json.dumps(Data), verify=False)
                # print(r.json())

        return r.json()
    except:
        Log('NetWork Error cannot send message')
#微信消息发送方法结束
def MainProcess(name):
    file = io.open(Quest_config, 'r', encoding='utf-8')
    file_obj = json.load(file)
	# BB名称 猛虎指挥官
    quest_name = file_obj['name']
	# BB上次刷新时间-初始刷新时间
	quest_last_time = datetime.strptime(file_obj['lastTime'], "%H:%M:%S")
	# 获取BB刷新间隔-猛虎指挥官 15525秒
    quest_duration = int(file_obj['duration'])
    file.close()
    pythoncom.CoInitialize() #避免：(-2147221008, '尚未调用 CoInitialize。', None, None)
    time.sleep(3)
	# 计算BOSS下次刷新时间
	final_time = quest_last_time + timedelta(seconds=quest_duration)
	quest_next_time = final_time.strftime("%H:%M:%S")
	data = "猛虎指挥官下次刷新时间：".decode("gbk") + quest_next_time
	Log(data)
    while (True):
		# 获取当前时间
		current_time = datetime.now()
		current_time_str = current_time.strftime("%H:%M:%S")
		data = "当前时间：".decode("gbk") + current_time_str
		Log(data)
		data = "猛虎指挥官下次刷新时间：".decode("gbk") + quest_next_time
		Log(data)
		# 判断是否需要提醒(如果current_time + 10分钟 > final_time 则提醒"BOSS即将在10分钟后刷新')
		if current_time + timedelta(minutes=10) > final_time:
			data = "猛虎指挥官即将在10分钟后刷新, 刷新时间为：".decode("gbk") + quest_next_time
			Log(data)
			SendMessage(data)
		if current_time > final_time:
			quest_last_time = final_time
			# 60秒是打死BB的平均时间差
			diff = quest_duration + 60
			final_time = quest_last_time + timedelta(seconds=diff)
			quest_next_time = final_time.strftime("%H:%M:%S")
			data = "猛虎指挥官已经刷新, 下次刷新时间已更新，刷新时间为：".decode("gbk") + quest_next_time
			Log(data)
			SendMessage(data)
		time.sleep(60)
def Log(data):
    tim = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    #print(tim)
    print(data)
# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    MainProcess('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
