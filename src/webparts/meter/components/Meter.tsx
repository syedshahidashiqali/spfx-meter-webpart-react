import * as React from 'react';
import styles from './Meter.module.scss';
import { IMeterProps } from './IMeterProps';
import Donut from './Donut';
import * as CSS from 'csstype'

export default class Meter extends React.Component<IMeterProps, {}> {
  public render(): React.ReactElement<IMeterProps> {
    return (
      <section className={styles.meter}>
        <header style={{textAlign: this.props.headerAlignment as CSS.Property.TextAlign}}>
          <h1>{ this.props.title }</h1>
          <p>{this.props.description}</p>
        </header>
        <Donut
          percentage={this.props.percentage}
          showPercentageValue={this.props.showPercentageValue}
        />
      </section>
    );
  }
}
