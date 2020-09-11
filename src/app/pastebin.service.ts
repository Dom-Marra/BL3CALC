import { Injectable } from '@angular/core';
import { ApiKey } from './api-key'
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PastebinService {

  private apiKey;
  private pasteName = "BL3BUILD";
  private pasetExpiration = "N";
  private pasteFormat = "json";

  constructor(private http: HttpClient, private api: ApiKey) {
    this.apiKey = api.getKey();
  }

  /**
   * Gets a build from pastebin
   * 
   * @param saveLink 
   *        pastebin entry
   */
  getBuild(saveLink: string) {

      return new Promise((resolve, reject) => {

        this.http.post("https://us-central1-bl3calc.cloudfunctions.net/getPaste", saveLink)
        .subscribe(build => {
          resolve(build["build"]);
        });

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
    
    var content = {
        api_dev_key: this.apiKey,
        api_paste_name: this.pasteName, 
        api_paste_expire_date: this.pasetExpiration,
        api_paste_format: this.pasteFormat,
        api_paste_code: JSON.stringify(build)
    }
        
    this.http.post("https://us-central1-bl3calc.cloudfunctions.net/pastebin", JSON.stringify(content))
<<<<<<< HEAD
      .subscribe(link => {
        if (link["link"] == "Post limit, maximum pastes per 24h reached") {
          prompt("Unfortunatley you've created too many builds in the past 24h, but here is the import data for the save:", JSON.stringify(build));
        } else {
          var response = link["link"] .replace('https://pastebin.com/','');
          prompt("Here is your build!", "https://www.bl3calc.com/build?character=" + character + "&save=" + response);
        }
      });
=======
      .pipe(catchError((err: any) => {
        prompt("There was an error while uploading your build, please try again later or save the build Data for import: ", JSON.stringify(build));
        return Observable.throw(err.text);
      })).subscribe(link => {
          if (link["link"] == "Post limit, maximum pastes per 24h reached") {
            prompt("Unfortunatley you've created too many builds in the past 24h, but here is the import data for the save:", JSON.stringify(build));
          } else {
            var response = link["link"] .replace('https://pastebin.com/','');
            prompt("Here is your build!", "https://bl3calc.com/build?character=" + character + "&save=" + response);
          }
        });
>>>>>>> development

  }
}