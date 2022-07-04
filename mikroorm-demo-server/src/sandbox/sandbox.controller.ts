import { Controller, Delete, Get, Logger, ParseBoolPipe, Post, Query } from '@nestjs/common';
import { SandboxService } from './sandbox.service';

const testPayloadSmall = {
  "name": "John Smith"
};

const testPayloadBig = {
      "apasVersion":"6.4.1-14186 (Windows 10-64bit)",
      "user":{
        "userName":"ftoth"
      },
      "profile":{
        "name":"Default Web Attendant",
        "id":25,
        "regexOutID":0,
        "userPoolId":11,
        "enableGroupFwd":false,
        "webexSiteName":"wac1",
        "layoutLocked":false,
        "webexDefaultUsername":"ssotest1@andtek.cee.cs.eilab.biz",
        "callListEntryNumber":100,
        "webexDefaultPassword":"And33phone",
        "thumbnailDirId":1,
        "enableGlobalFwd":false,
        "webexDefaultMeetingPassword":"wac3",
        "enableSetPostcallState":false,
        "enableCustomGroup":true,
        "enableSetOffworkState":false,
        "presenceSubscriptionTime":1800,
        "enabledFeatures":255,
        "regexCtiID":0,
        "dirGroupID":4,
        "lookupGroupID":2,
        "directoryPresenceEnabled":true,
        "webexDefaultMeetingName":"wac2",
        "queueCallMediaId":0,
        "queuedTransferAvailable":false,
        "callCenterCallBackFeatureEnabled":true,
        "profileEnabled":true,
        "agentSetSkillFeatureEnabled":true,
        "groupFeatureEnabled":true,
        "callCenterCallBackHasLicense":true,
        "groupHasLicense":true,
        "callListHasLicense":true,
        "callListFeatureEnabled":true,
        "directoryHasLicense":true,
        "directoryFeatureEnabled":true,
        "callCenterFeatureEnabled":true,
        "callCenterHasLicense":true
      },
      "gridster":{
        "widgets":[
          {
            "x":0,
            "y":0,
            "widgetId":0,
            "rows":2,
            "cols":1,
            "widgetDataJson":"{\"data\":1}",
            "widgetType":"wac-call"
          },
          {
            "x":0,
            "y":2,
            "widgetId":31,
            "rows":4,
            "cols":1,
            "widgetDataJson":"{\"selectedDirectoryId\":\"12\"}",
            "widgetType":"wac-directory"
          },
          {
            "x":1,
            "y":0,
            "widgetId":32,
            "rows":6,
            "cols":1,
            "widgetDataJson":"{}",
            "widgetType":"wac-dev"
          }
        ]
      },
      "phones":[

      ],
      "calls":[

      ],
      "settings":{
        "id":8,
        "userId":"ftoth",
        "groupOfGroups":[

        ],
        "language":"en",
        "activeLine":null,
        "activeDevice":null,
        "webexId":"1",
        "webexPassword":"",
        "webexMeetingName":"",
        "webexMeetingPassword":"",
        "theme":null,
        "log":false,
        "consoleLogLevel":"DEBUG",
        "avatar":null,
        "enabledLogoutPopup":false,
        "lineSelectorCollapsed":false,
        "emUsername":null,
        "emPassword":""
      },
      "queues":[

      ],
      "lastOutgoingLines":[

      ],
      "hotkeys":[
        {
          "id":145,
          "name":"cheatsheet",
          "combo":[
            "?"
          ]
        },
        {
          "id":146,
          "name":"newOutgoingCall",
          "combo":[
            "n"
          ]
        },
        {
          "id":147,
          "name":"acceptRingingCall",
          "combo":[
            "a"
          ]
        },
        {
          "id":148,
          "name":"muteActiveCall",
          "combo":[
            "m"
          ]
        },
        {
          "id":149,
          "name":"endActiveCall",
          "combo":[
            "e"
          ]
        },
        {
          "id":150,
          "name":"acceptOrForwardCall",
          "combo":[
            "w"
          ]
        },
        {
          "id":151,
          "name":"switchActiveCall",
          "combo":[
            "b"
          ]
        },
        {
          "id":152,
          "name":"joinCalls",
          "combo":[
            "j"
          ]
        },
        {
          "id":153,
          "name":"conferenceCalls",
          "combo":[
            "c"
          ]
        }
      ],
      "emailTemplateVariableInfo":{
        "ccEmail":[
          "email"
        ],
        "subject":[
          "email",
          "name",
          "number",
          "firstname",
          "lastname",
          "date",
          "datetime"
        ],
        "toEmail":[
          "email"
        ],
        "body":[
          "email",
          "number",
          "name",
          "firstname",
          "lastname",
          "date",
          "datetime",
          "calllist_callingparty_number",
          "calllist_callingparty_name",
          "calllist_calledparty_number",
          "calllist_calledparty_name",
          "calllist_lastredirectedparty_number",
          "calllist_lastredirectedparty_name",
          "calllist_originalcalledparty_number",
          "calllist_originalcalledparty_name",
          "calllist_datetime",
          "calllist_duration",
          "calllist_direction",
          "calllist_state",
          "call_callingparty_number",
          "call_callingparty_name",
          "call_calledparty_number",
          "call_calledparty_name",
          "call_lastredirectedparty_number",
          "call_lastredirectedparty_name",
          "call_originalcalledparty_number",
          "call_originalcalledparty_name",
          "call_direction",
          "call_state",
          "directory_firstname",
          "directory_lastname",
          "directory_phone",
          "directory_email"
        ]
      },
      "emailTemplates":[
        {
          "id":13,
          "profileId":25,
          "userId":null,
          "name":"gwt",
          "toEmail":"",
          "ccEmail":"",
          "subject":"sub",
          "body":"${date} asasa"
        },
        {
          "id":12,
          "profileId":null,
          "userId":"ftoth",
          "name":"wac3",
          "toEmail":"a@b.c",
          "ccEmail":"",
          "subject":"",
          "body":"1212121\n2323232\n"
        }
      ],
      "serverTime":1656588145318
    };

@Controller('sandbox')
export class SandboxController {
  constructor(private sandboxService: SandboxService) {}

  @Get('emDumpWithFind')
  emDumpWithFind() {
    this.sandboxService.emDumpWithFind();
  }

  @Post('manyToOneOptional')
  manyToOneOptional(@Query('assign', ParseBoolPipe) assign: boolean) {
    this.sandboxService.manyToOneOptional(assign);
  }

  kutya(num: number): number;
  kutya(num: number, s?: string): number {
    if (s === undefined) {
      s = '111';
    }
    return 1;
  }

  add(first: number, second: number): number; //Overload signature with two parameters
  add(first: number, second: number, third: number): number; //Overload signature with three parameters
  add(first: number, second: number, third?: number, fourth?: number): number {
    //Implementation signature
    if (first !== undefined && second !== undefined && third !== undefined) {
      return first + second + third;
    } else {
      return first + second;
    }
  }

  @Get('test')
  test(): any {
    return testPayloadBig;
  }
}
