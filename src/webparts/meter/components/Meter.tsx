import * as React from 'react';
import styles from './Meter.module.scss';
import { IMeterProps } from './IMeterProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Meter extends React.Component<IMeterProps, {}> {
  public render(): React.ReactElement<IMeterProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.meter} ${hasTeamsContext ? styles.teams : ''}`}>
        <h1>{ this.props.title }</h1>
        <p>{ this.props.description }</p>
      </section>
    );
  }
}
