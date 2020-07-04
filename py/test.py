import time
from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.acs_exception.exceptions import ClientException
from aliyunsdkcore.acs_exception.exceptions import ServerException
from aliyunsdkiot.request.v20180120.InvokeThingServiceRequest import InvokeThingServiceRequest

client = AcsClient('LTAI4GAoFDpefUJBFSDXkSC8', 'YTsrYPh1Y877GtfknOUGYwxQPLYMPD', 'cn-shanghai')

request = InvokeThingServiceRequest()
request.set_accept_format('json')
request.set_Args("{\"uuid\":\"aa\"}")
request.set_Identifier("setCurrentTabSync")
request.set_DeviceName("0001")
request.set_ProductKey("a1VS22jypKl")

ids = ["aa", "bb"]
ids_index = 0

while(True):
    print("looping..." + str(ids[ids_index]))
    request.set_Args("{\"uuid\":\"" + str(ids[ids_index])+ "\"}")
    ids_index=(ids_index+1) % len(ids)
    time.sleep(20)
    response = client.do_action_with_exception(request)
#     print(response)



# python2:  print(response)

