import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

class Scoreboard extends React.Component{
    static propTypes = {
      score: React.PropTypes.number
    }

    static defaultProps = {
      startedAt: new Date(),
      score: 0
    }

    constructor(props){
        super(props);

        this.state = {
          playtime: 0,
          score: this.props.score
        };

        this.timeInterval = setInterval(() => {
          this.setState({
            playtime: Date.now() - this.props.startedAt.getTime()
          });
        }, 1000);

        window._updateScore = this.setScore.bind(this); //total hack as i can think of a better way... yet?
    }

    setScore(score){
      this.setState({
        score: score
      });
    }

    render(){
        return <div id="scoreboard">
          <h2>Score:</h2><p>{ this.state.score }</p>
          <h2>Playtime:</h2><p>{ moment.utc(this.state.playtime).format("HH:mm:ss") }</p>
        </div>;
    }
}

var instance = null;
class ScoreboardSingleton{
  static get instance(){
    if(!instance){
      //instance = new Scoreboard();
      instance = <Scoreboard />
      ReactDOM.render(
        instance,
        document.getElementById('info')
      );
    }

    return instance;
  }
}

export default ScoreboardSingleton
