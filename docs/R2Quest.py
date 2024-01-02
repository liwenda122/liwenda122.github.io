#! /usr/bin/env python
# coding=gbk
#pip install pypiwin32 -i https://pypi.tuna.tsinghua.edu.cn/simple/
import pythoncom
import win32com.client
import threading
#微信消息发送方法开始
# usage: send message via wechat
import requests, sys, json, os, io, time, datetime
import urllib3
urllib3.disable_warnings()
reload(sys)
#重新设置字符集 否则会出现中文消息乱码
sys.setdefaultencoding("utf-8")
###企业微信参数###
# Corpid是企业号的标识
Corpid = "wwa4fc311ea775d93e"
# Secret是管理组凭证密钥
Secret = "Rl8ODMG0cSZ_O6SrE1ODA-HeTo_v4XAqAQuToFQ87-8"
# 应用ID-海盗鹰
Agentid = "1000004"
# token_config文件放置路径
path = os.path.abspath(__file__)
pathDir = os.path.split(path)[0]
Token_config = os.path.join(pathDir,"token_config.json")
Quest_config = os.path.join(pathDir,"quest_config.json")
# 战区配置文件war_config文件放置路径
#War_config = os.path.join(pathDir,"war_config.json")
# 先从企业微信服务器获取token,然后保存到本地
def GetTokenFromServer(Corpid, Secret):
    """获取access_token"""
    Url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken"
    Data = {
        "corpid": Corpid,
        "corpsecret": Secret
    }
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
    # Partyid 2=海盗2战区 8=六月平台 9=山风平台 10=马蛋点 11水母暗杀组 12 自动任务组
    Partyid = "12"
    Subject = '任务小秘书,'
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
    DataJSON = json.dumps(Data)
    r = requests.post(url=Url, data=DataJSON, verify=False)

    # 如果发送失败，将重试三次
    n = 1
    while r.json()['errcode'] != 0 and n < 4:
        n = n + 1
        Token = GetTokenFromServer(Corpid, Secret)
        if Token:
            Url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s" % Token
            r = requests.post(url=Url, data=json.dumps(Data), verify=False)
            #print(r.json())

    return r.json()
#微信消息发送方法结束
def MainProcess(name):
    file = io.open(Quest_config, 'r', encoding='utf-8')
    file_obj = json.load(file)
    quest_name = file_obj['name']
    quest_cost = int(file_obj['time'])
    file.close()
    # 做任务的角色名
    #quest_name = input('请输入要自动做重复任务的角色名,可以手动输入，也可以右键黏贴，然后按回车键：')
    # 单个任务耗时（分钟）
    #quest_cost = int(input('请输入完成单个任务所需要的时间，单位为分钟，然后按回车键：'))
    # 任务总数量（包含完成任务后去挂机点的配置） 天空8个，盈月2个 前线是最后一个
    quest_count = 10
    pythoncom.CoInitialize() #避免：(-2147221008, '尚未调用 CoInitialize。', None, None)
    dm = win32com.client.Dispatch('dm.dmsoft')  # 调用大漠插件
    print(dm.ver())  # 输出版本号
    dm_ret = dm.Reg("liwenda1225ef17facb597b0636c09c5e476f69405", "") # 请使用自己的注册码
    print(dm_ret)
    time.sleep(3)
    i = 0
    while (i < quest_count):
        hwnd = dm.EnumWindow(0, quest_name, "", 1 + 4 + 8 + 16)
        Log(quest_name)
        Log("当前正在进行的任务序号是:".decode("gbk"))
        Log(i+1)
        # Log(type(quest_name))
        # data = quest_name.encode('gbk') + ",已完成今日重复任务!"
        # data = data.decode('gbk')
        # SendMessage(data)

        if len(hwnd) > 0:
            hwnds = str(hwnd).split(",")
            cur_hwnd = hwnds[0]
            dm_ret = dm.SetWindowState(cur_hwnd, 12)
            # dm.SetSimMode(2) dx.mouse.position.lock.api 在子线程中使用lock 会返回-16 绑定失败错误，而且绑定时间比较长
            dm_ret = dm.BindWindowEx(cur_hwnd, "normal", "windows3", "normal", "", 0)
            #dm_ret = dm.BindWindowEx(cur_hwnd, "normal", "dx.mouse.position.lock.api | dx.mouse.position.lock.message | dx.mouse.clip.lock.api | dx.mouse.input.lock.api | dx.mouse.state.api | dx.mouse.api | dx.mouse.cursor", "normal", "", 1)
            # Log(dm.GetLastError())
            dm.Delay(1000)
            data = "骑士挂绑定结果:"
            data = data.decode('gbk')
            Log(data)
            Log(dm_ret)
            # 1 点击下拉框
            # 鼠标移动到 下拉框基准坐标 ，点击下拉框
            # TODO OK 下拉箭头的位置
            basePosX = 203
            basePosY = 524
            # TODO OK 当前配置 中线的位置
            basePosX2 = 116
            basePosY2 = 532
            dm.MoveTo(basePosX, basePosY)
            dm.Delay(200)
            dm.LeftClick()
            dm.Delay(1000)
            j = 0
            while (j < i + 1):
                dm.SetWindowState(cur_hwnd, 12)
                dm.KeyPress(40)
                dm.Delay(500)
                j = j + 1
            dm.SetWindowState(cur_hwnd, 12)
            dm.Delay(500)
            dm.KeyPress(13)
            # 改为使用键盘操作
            # 6 TODO 点击读取配置 370 525
            loadConfigPosX = 256
            loadConfigPosY = 525
            dm.Delay(300)
            dm.MoveTo(loadConfigPosX, loadConfigPosY)
            dm.Delay(400)
            dm.LeftClick()
            dm.Delay(200)
            dm.LeftClick()
            dm.Delay(200)

            # 7 点击保存配置 370 525
            confirmPosX = 370
            confirmPosY = 525
            dm.MoveTo(confirmPosX, confirmPosY)
            dm.Delay(400)
            dm.LeftClick()
            dm.Delay(200)
            dm.LeftClick()
            dm.Delay(200)

            dm_ret = dm.UnBindWindow()
        else:
            hwnds = []
            #当前角色没有外挂窗口，无法处理
        if i == quest_count - 1:
            # 最后一个盈月前线 使用3倍消耗时间
            time.sleep(quest_cost * 60 * 3)
        else:
            time.sleep(quest_cost * 60)
        i=i+1
        if i == quest_count:
            data = quest_name.encode('gbk') + ",已完成今日重复任务!"
            data = data.decode('gbk')
            SendMessage(data)
def Log(data):
    tim = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    #print(tim)
    print(data)
# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    MainProcess('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
