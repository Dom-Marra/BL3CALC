import { Injectable } from '@angular/core';
import { ApiKey } from './api-key'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PastebinService {

  private apiKey;
  private pasteSecurity = '0';
  private pasteName = "BL3BUILD";
  private pasetExpiration = "N";
  private pasteFormat = "json";
  private userKey = "";

  constructor(private httpClient: HttpClient, private api: ApiKey) {
    this.apiKey = api.getKey();
  }

  /**
   * Gets a build from pastebin
   * 
   * @param saveLink 
   *        pastebin entry
   */
  getBuild(saveLink: string) {

      var request = new XMLHttpRequest();
      request.open("GET", "https://crossorigin.me/https://www.pastebin.com/raw/" + saveLink, true);

      request.send(saveLink);
    
      return new Promise((resolve, reject) => {
        request.onreadystatechange = function() {
          request.onload = () => {
            resolve(JSON.parse(request.response));
          }
          request.onerror = reject;
        }
      });
  }

  /**
   * Creates a pastebin entry with the build data
   * If the pastebin guest has created 10 builds within 24 hours
   * or their was an error posting the build it will provide the build data 
   * for import
   * 
   * @param build
   *        build data 
   * @param character 
   *        character type
   */
  createBuild(build: Object, character: string) {
    
    var content = 
        'api_dev_key=' + this.apiKey +
        '&api_option=paste' +
        '&api_user_key=' + this.userKey +
        '&api_paste_private=' + this.pasteSecurity +
        '&api_paste_name=' + this.pasteName +
        '&api_paste_expire_date=' + this.pasetExpiration +
        '&api_paste_format=' + this.pasteFormat +
        '&api_paste_code=' + JSON.stringify(build);

    var request = new XMLHttpRequest();

    request.open("POST", "https://crossorigin.me/https://www.pastebin.com/api/api_post.php", true);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(content);

    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        var response: string = request.response;
        if (response == "Post limit, maximum pastes per 24h reached") {
          prompt("Unfortunatley you've created too many builds in the past 24h, but here is the import data for the save:", JSON.stringify(build));
        } else {
          response = response.replace('https://pastebin.com/','');
          prompt("Here is your build!", "https://dom-marra.github.io/BL3CALC/build?character=" + character + "&save=" + response);
        }
      }
    }
  }
}