import os, os.path
import shutil
import subprocess
import json
import calendar
import time
import datetime;
import io
import sys
import pymongo

myclient = pymongo.MongoClient("mongodb+srv://publishappuser:publishappspassword123@cluster0.48ylote.mongodb.net/?retryWrites=true&w=majority")
mydb = myclient["publishingapps"]
mycol = mydb["apps"]

type = str(sys.argv[1]) # all , lf , continue
 
ct = datetime.datetime.now()

DIR = './ExpoAppJsonsProjects'

lastpublisharr = mycol.find().sort("number",-1).limit(1)
lastpublishobj = lastpublisharr[0]

lastapps = []
lastpublishnumber = 0
if lastpublishobj is not None:
    lastpublishnumber = lastpublishobj['number']
    lastapps = lastpublishobj['apps']


lst = os.listdir(DIR) # your directory path
reqarray = []
if type == 'all':
  reqarray = lst
elif type == 'lf':
    for lastappsobj in lastapps:
      if lastappsobj['AlPublishStatus'] == False:
        reqarray.append(lastappsobj['name'])
    print('Retrying Failed Apps Count: '+str(len(reqarray)))
    print(reqarray)
elif type == 'continue':
    for lastappsobj in lastapps:
      if lastappsobj['AlPublishStatus'] == False:
        reqarray.append(lastappsobj['name'])
    for  filenameallappsarrayobj in lst:
      appfound = False
      for lastappsobj in lastapps:
        if lastappsobj['name'] == filenameallappsarrayobj:
          appfound = True
      if appfound == False:
          reqarray.append(filenameallappsarrayobj)

    print('To Continue Apps Count: '+str(len(reqarray)))
    print(reqarray)
class deployment:
   number:0
 
deplyoymentnumber = int(lastpublishnumber)+1
deploymentobj = deployment()
deploymentobj.number = deplyoymentnumber
deploymentobj.timestamp = str(ct)
deploymentobj.apps = []
if type == 'all':
  mycol.insert_one({"number":deplyoymentnumber,"timestamp":str(ct),"apps":[]})
if type == 'lf' or type == 'continue' :
   deplyoymentnumber = lastpublishnumber

updatequery = { "number": deplyoymentnumber }



for appjsonnamefile in reqarray:
  publishsuccess = False
  print(appjsonnamefile)
  shutil.copy2(DIR+'/'+appjsonnamefile, './app.json')
  proc = subprocess.Popen("expo publish", shell=True, stdout=subprocess.PIPE)
  for line in io.TextIOWrapper(proc.stdout, encoding="utf-8"):
    print(appjsonnamefile+' >> '+line)
    if format(line.rstrip()) == 'Publish complete':
      publishsuccess = True
  newappobj = {'AlPublishStatus':publishsuccess,'name':appjsonnamefile,"trials":[{'timestamp':str(ct),'publishstatus':publishsuccess}]}
  if type == 'all':
    

    deploymentobj.apps.insert(0,newappobj)
    mycol.update_one(updatequery, { "$set": { "apps": deploymentobj.apps } })
 
  if type == 'lf' or type == 'continue':
    isappfound = False
    for index, lastpublishedappsobj in enumerate(lastapps):
      if lastpublishedappsobj['name'] == appjsonnamefile:
        lastpublishedappsobj['AlPublishStatus'] = publishsuccess   
        lastapps[index]['trials'].insert(0,{'timestamp':str(ct),'publishstatus':publishsuccess})
        mycol.update_one(updatequery, { "$set": { "apps": lastapps } })

        isappfound = True
    if isappfound == False:
      lastapps.insert(0,newappobj)
      mycol.update_one(updatequery, { "$set": { "apps": lastapps } })
 


print ('done')