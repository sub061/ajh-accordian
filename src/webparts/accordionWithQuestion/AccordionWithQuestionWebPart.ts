import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { IListContent } from './components/IAccordionWithQuestionProps';




import * as strings from 'AccordionWithQuestionWebPartStrings';
import AccordionWithQuestion from './components/AccordionWithQuestion';
import { IAccordionWithQuestionProps } from './components/IAccordionWithQuestionProps';


export interface IAccordionWithQuestionWebPartProps {
  description: string;
}

export default class AccordionWithQuestionWebPart extends BaseClientSideWebPart<IAccordionWithQuestionWebPartProps> {


  protected async render(): Promise<void> {
 
      try {
        const getQuestionAnswer = await this.getData();
         const element: React.ReactElement<IAccordionWithQuestionProps> = React.createElement(
      AccordionWithQuestion,
      {
        getQuestionAnswer :getQuestionAnswer 
      }
    );

    ReactDom.render(element, this.domElement);

      } catch (e) {
        
        console.log("error occured", e);
      }
    
    if (this.domElement) {

    } else {
      console.log("Dom element is not avaliable");
 }


   
  }

// Sorting function
private sortByColumn(items: IListContent[], columnName: string): IListContent[] {
  return items.sort((a, b) => {
    if (a[columnName] < b[columnName]) return -1;
    if (a[columnName] > b[columnName]) return 1;
    return 0;
  });
}

  public async getData(): Promise<IListContent[]> {
    const requestUrl = `${this.context.pageContext.web.absoluteUrl}/_api/web/Lists/GetByTitle('${this.properties.description}')/Items`;
    const response: SPHttpClientResponse = await this.context.spHttpClient.get(
      requestUrl,
      SPHttpClient.configurations.v1
    );
    const data = await response.json();
    console.log("Sub Goal --->", data.value);
     var sortitems = this.sortByColumn(data.value, 'Position');
    return sortitems;
  }


  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

 
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
