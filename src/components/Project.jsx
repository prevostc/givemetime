import React from 'react';

import LinearProgress from 'material-ui/lib/linear-progress'
import {Card,CardHeader,CardText} from 'material-ui/lib/card'

export default class Project extends React.Component {
    
    constructor(){
        super();
    }


    render(){
        return <div>
                    <Card expanded={null} expandable={false} initiallyExpanded={false}>
                        <CardHeader title={this.props.title} subtitle={this.props.author}/>
                        <CardText>
                            <div>Estimated time : {this.props.estimate}</div>
                            <LinearProgress max={this.props.estimate} min={0} value={this.props.acquired} mode="determinate"/>
                        </CardText>
                    </Card>
                </div>
    }    
}