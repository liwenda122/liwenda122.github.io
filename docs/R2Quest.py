#! /usr/bin/env python
# coding=gbk
#pip install pypiwin32 -i https://pypi.tuna.tsinghua.edu.cn/simple/
import pythoncom
import win32com.client
import threading
#΢����Ϣ���ͷ�����ʼ
# usage: send message via wechat
import requests, sys, json, os, io, time, datetime
import urllib3
urllib3.disable_warnings()
reload(sys)
#���������ַ��� ��������������Ϣ����
sys.setdefaultencoding("utf-8")
###��ҵ΢�Ų���###
# Corpid����ҵ�ŵı�ʶ
Corpid = "wwa4fc311ea775d93e"
# Secret�ǹ�����ƾ֤��Կ
Secret = "Rl8ODMG0cSZ_O6SrE1ODA-HeTo_v4XAqAQuToFQ87-8"
# Ӧ��ID-����ӥ
Agentid = "1000004"
# token_config�ļ�����·��
path = os.path.abspath(__file__)
pathDir = os.path.split(path)[0]
Token_config = os.path.join(pathDir,"token_config.json")
Quest_config = os.path.join(pathDir,"quest_config.json")
# ս�������ļ�war_config�ļ�����·��
#War_config = os.path.join(pathDir,"war_config.json")
# �ȴ���ҵ΢�ŷ�������ȡtoken,Ȼ�󱣴浽����
def GetTokenFromServer(Corpid, Secret):
    """��ȡaccess_token"""
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
        #��һ�ε��ú�token���ں󣬶����ٴλ�ȡ�µ�token����������
        Token = r.json()['access_token']
        file = io.open(Token_config, 'w', encoding='utf-8')
        file.write(r.text)
        file.close()
        return Token

def SendMessage(Content):
    """������Ϣ"""
    # ��ȡtoken��Ϣ
    try:
        file = io.open(Token_config, 'r', encoding='utf-8')
        Token = json.load(file)['access_token']
        file.close()
    except:
        #TokenΪ�� ���� Token �Ѿ����ڣ��ӷ��������»�ȡ
        Token = GetTokenFromServer(Corpid, Secret)
    # Partyid 2=����2ս�� 8=����ƽ̨ 9=ɽ��ƽ̨ 10=���� 11ˮĸ��ɱ�� 12 �Զ�������
    Partyid = "12"
    Subject = '����С����,'
    Subject = Subject.decode('gbk')
    # Content ='���Ӹ� ������ҹ����س�, ��ע��鿴'
    # sEncodeContent = quote(Content.encode('utf-8').decode('utf-8'))
    # sEncodeSubject = quote(Subject.encode('utf-8').decode('utf-8'))
    # ������Ϣ
    Url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s" % Token
    Data = {
        "toparty": Partyid,
        "msgtype": "text",
        "agentid": Agentid,
        "text": {"content": Subject + Content},
        "safe": "0"
    }
    # ensure_ascii=False ��ֹ��������
    DataJSON = json.dumps(Data)
    r = requests.post(url=Url, data=DataJSON, verify=False)

    # �������ʧ�ܣ�����������
    n = 1
    while r.json()['errcode'] != 0 and n < 4:
        n = n + 1
        Token = GetTokenFromServer(Corpid, Secret)
        if Token:
            Url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s" % Token
            r = requests.post(url=Url, data=json.dumps(Data), verify=False)
            #print(r.json())

    return r.json()
#΢����Ϣ���ͷ�������
def MainProcess(name):
    file = io.open(Quest_config, 'r', encoding='utf-8')
    file_obj = json.load(file)
    quest_name = file_obj['name']
    quest_cost = int(file_obj['time'])
    file.close()
    # ������Ľ�ɫ��
    #quest_name = input('������Ҫ�Զ����ظ�����Ľ�ɫ��,�����ֶ����룬Ҳ�����Ҽ������Ȼ�󰴻س�����')
    # ���������ʱ�����ӣ�
    #quest_cost = int(input('��������ɵ�����������Ҫ��ʱ�䣬��λΪ���ӣ�Ȼ�󰴻س�����'))
    # ������������������������ȥ�һ�������ã� ���8����ӯ��2�� ǰ�������һ��
    quest_count = 10
    pythoncom.CoInitialize() #���⣺(-2147221008, '��δ���� CoInitialize��', None, None)
    dm = win32com.client.Dispatch('dm.dmsoft')  # ���ô�Į���
    print(dm.ver())  # ����汾��
    dm_ret = dm.Reg("liwenda1225ef17facb597b0636c09c5e476f69405", "") # ��ʹ���Լ���ע����
    print(dm_ret)
    time.sleep(3)
    i = 0
    while (i < quest_count):
        hwnd = dm.EnumWindow(0, quest_name, "", 1 + 4 + 8 + 16)
        Log(quest_name)
        Log("��ǰ���ڽ��е����������:".decode("gbk"))
        Log(i+1)
        # Log(type(quest_name))
        # data = quest_name.encode('gbk') + ",����ɽ����ظ�����!"
        # data = data.decode('gbk')
        # SendMessage(data)

        if len(hwnd) > 0:
            hwnds = str(hwnd).split(",")
            cur_hwnd = hwnds[0]
            dm_ret = dm.SetWindowState(cur_hwnd, 12)
            # dm.SetSimMode(2) dx.mouse.position.lock.api �����߳���ʹ��lock �᷵��-16 ��ʧ�ܴ��󣬶��Ұ�ʱ��Ƚϳ�
            dm_ret = dm.BindWindowEx(cur_hwnd, "normal", "windows3", "normal", "", 0)
            #dm_ret = dm.BindWindowEx(cur_hwnd, "normal", "dx.mouse.position.lock.api | dx.mouse.position.lock.message | dx.mouse.clip.lock.api | dx.mouse.input.lock.api | dx.mouse.state.api | dx.mouse.api | dx.mouse.cursor", "normal", "", 1)
            # Log(dm.GetLastError())
            dm.Delay(1000)
            data = "��ʿ�Ұ󶨽��:"
            data = data.decode('gbk')
            Log(data)
            Log(dm_ret)
            # 1 ���������
            # ����ƶ��� �������׼���� �����������
            # TODO OK ������ͷ��λ��
            basePosX = 203
            basePosY = 524
            # TODO OK ��ǰ���� ���ߵ�λ��
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
            # ��Ϊʹ�ü��̲���
            # 6 TODO �����ȡ���� 370 525
            loadConfigPosX = 256
            loadConfigPosY = 525
            dm.Delay(300)
            dm.MoveTo(loadConfigPosX, loadConfigPosY)
            dm.Delay(400)
            dm.LeftClick()
            dm.Delay(200)
            dm.LeftClick()
            dm.Delay(200)

            # 7 ����������� 370 525
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
            #��ǰ��ɫû����Ҵ��ڣ��޷�����
        if i == quest_count - 1:
            # ���һ��ӯ��ǰ�� ʹ��3������ʱ��
            time.sleep(quest_cost * 60 * 3)
        else:
            time.sleep(quest_cost * 60)
        i=i+1
        if i == quest_count:
            data = quest_name.encode('gbk') + ",����ɽ����ظ�����!"
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
