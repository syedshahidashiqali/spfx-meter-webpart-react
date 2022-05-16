import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneCheckbox,
  PropertyPaneSlider,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import {
  PropertyFieldColorPicker,
  PropertyFieldColorPickerStyle
} from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'MeterWebPartStrings';
import Meter from './components/Meter';
import { IMeterProps } from './components/IMeterProps';

export interface IMeterWebPartProps {
  title: string;
  description: string;
  percentage: number;
  headerAlignment: string;
  showPercentageValue: boolean;
  fillColor: string;
}

export default class MeterWebPart extends BaseClientSideWebPart<IMeterWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IMeterProps> = React.createElement(
      Meter,
      {
        title: this.properties.title,
        description: this.properties.description,
        percentage: this.properties.percentage,
        headerAlignment: this.properties.headerAlignment,
        showPercentageValue: this.properties.showPercentageValue,
        fillColor: this.properties.fillColor,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

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
            description: "Meter Settings"
          },
          groups: [
            {
              groupName: "Header Settings",
              groupFields: [
                PropertyPaneTextField('title', {
                  label: "Title"
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown("headerAlignment", {
                  label: "Header Alignment",
                  options: [
                    { key: "left", text: "Left"},
                    { key: "center", text: "Center"},
                    { key: "right", text: "Right"},
                  ]
                })
              ]
            },
            {
              groupName: "Chart Settings",
              groupFields: [
                PropertyPaneTextField('percentage', {
                  label: "Percentage"
                }),
                PropertyPaneCheckbox("showPercentageValue", {
                  text: "Show Percentage"
                }),
                PropertyPaneSlider("percentage", {
                  min: 0,
                  max: 100,
                  step:1,
                }),
                PropertyPaneLabel(null, {
                  text: 'Enter a value between 0 and 100'
                }),
                PropertyFieldColorPicker('fillColor', {
                  label: 'Fill Color',
                  selectedColor: this.properties.fillColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  debounce: 0, // delay after which control value will be set.
                  isHidden: false,
                  alphaSliderHidden: true,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
