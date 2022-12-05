
import { Injectable, HttpException, HttpService } from '@nestjs/common';
import { Console } from 'console';
import MUser from '@models/User';
import _ from 'lodash'
import { UserEntAB } from '@/users/entities/user.entity';
import { validatePHContact } from '@/services/validator.service';
import { isEmpty } from 'class-validator';
// const fetch =require("node-fetch");
const fetch = require('node-fetch');
const http = require('http');
var base64 = require('base-64');
// import base64 from 'base-64'


type SmsType = {
  message?: string;
  number?: string;
  path?: string;
  departments?: string[];
  users?: string[];
}

@Injectable()
export class SmSNotifService {
  constructor(private http: HttpService) { }

  async smsNotif() {
    const response = await this.http
      .get('https://172.16.10.13/cgi/WebCGI?1500101=account=apiuser&password=apipass&port=1&destination=+639122577739&content=ACEBOOKNATHIS')
      .toPromise()
      .catch((err) => {
        throw new HttpException(err.response.data, err.response.status);
      });

    return response.data;
  }
}


export const sendSmsNotif = async ({ message, number, path }: SmsType) => {

  let removeMsgSymb = message.replace("#", " ")

  let notifPath = `${process.env.FRONT_URL}${path}`

  let newMessage = removeMsgSymb + `%0D%0A%0D%0A${notifPath}%0D%0A%0D%0A-+ACEBOOK+ALERT+-`

  const req = http.request(`${process.env.SMS_URL}&destination=${number}&content=${newMessage}`,
    {
      headers:
      {
        'Authorization': 'Bearer ' + base64.encode("fcdgfhfgnvbcxhtrrhjgfbnvchtrbvcbvc"),
        'Content-Type': '/',
        'account': 'apiuser',
        'password': 'apipass',
      }
    }
    , (res) => {
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('FINISH');
      });
    });
  req.on('error', (e) => {
    // console.error(`ERROR： ${e.message}`);
  });
  req.end();

  return 0
  // return response
}


export const smsProcess = async ({ departments, users, message, path }: SmsType) => {
  let allContact = []

  if (departments) {
    let depUser: UserEntAB[] = await MUser.find({ departmentOnDuty: departments })
    if (depUser.length > 0) {
      let depContact: string[] = _.map(depUser, "contact")
      if (depContact.length > 0) {
        allContact = [...allContact, ...depContact]
      }
    }
  }

  if (users) {
    let specUser: UserEntAB[] = await MUser.find({ _id: { $in: users } })
    if (specUser.length > 0) {
      let userContact: string[] = _.map(specUser, "contact")
      if (userContact.length > 0) {
        allContact = [...allContact, ...userContact]
      }
    }
  }

  // Get only Unique
  let uniqContact: string[] = _.uniq(allContact)
  // console.log(uniqContact)

  let toSendContacts: string[] = []

  uniqContact.map((item: string) => {
    if (!isEmpty(item)) {
      if (validatePHContact(item)) {
        toSendContacts.push(item)
      }
    }
  })

  // console.log(toSendContacts)

  toSendContacts.map((item: string) => {
    if (!isEmpty(item)) {
      // console.log("sent")
      sendSmsNotif({ message: message, number: item, path: path })
    }
  })

}