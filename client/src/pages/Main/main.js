import React, { Component } from "react";
import Saved from "../Saved/saved";
import Search from "../Search/search";
import Results from "../Results/results";
import API from "../../utils/API";
import Jumbotron from "../../components/Jumbotron";

class Main extends Component {

  state = {
    topic: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: []
  };

  // Mounts all saved articles
  componentDidMount() {
    this.getSavedArticles()
  }

  // Get all saved articles from database
  getSavedArticles = () => {
    API.getArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }

  renderArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  renderSaved = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        key={save._id}
        title={save.title}
        date={save.date}
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  //Sets topic user searched for 
  handleTopic = (event) => {
    this.setState({ topic: event.target.value });
  }

  //Sets start year user searched for 
  handleStartYear = (event) => {
    this.setState({ startYear: event.target.value });
  }

  //Sets end year user searched for 
  handleEndYear = (event) => {
    this.setState({ endYear: event.target.value });
  }

  // Searched NYT with set info above
  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Getting NYT Articles");
    console.log("this.state.topic: ", this.state.topic);
    console.log("this.state.startYear: ", this.state.startYear);
    console.log("this.state.endYear: ", this.state.endYear);
    API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        this.setState({ articles: res.data.response.docs });
        console.log("this.state.articles: ", this.state.articles);
      });
  }

  // Saves article to database
  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then(this.getSavedArticles());
  }

  // Removes article from database
  handleDeleteButton = (id) => {
    API.deleteArticle(id)
      .then(this.getSavedArticles());
  }

  render() {
    return (

      <div className="main-container">
        <div className="container">

          <Jumbotron>
              <h1>New York Times Article Search</h1>
              <h2>Search and save any article!</h2>
            </Jumbotron>

          {/* Search Form and Results */}
          <Search
            handleTopic={this.handleTopic}
            handleStartYear={this.handleStartYear}
            handleEndYear={this.handleEndYear}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
          />

          {/* Saved Articles */}
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">
                        Saved Articles:
                    </h3>
                  </div>
                  <div className="panel-body">
                    <ul className="list-group">
                      {this.renderSaved()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

    );
  }

}

export default Main;