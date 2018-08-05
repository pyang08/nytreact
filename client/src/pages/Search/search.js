import React from "react";

const Search = props =>
  <div className="container">
    <div className="row">

      <div className="col-lg-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">
              Search
            </h3>
          </div>

          <div className="panel-body">
            <form>
              <div className="form-group">
                <label htmlFor="topic">
                  Topic
                </label>
                <input onChange={props.handleTopic} type="text" className="form-control" id="topic" />
              </div>

              <div className="form-group">
                <label htmlFor="start-year">
                  Start Year
                </label>
                <input onChange={props.handleStartYear} type="text" className="form-control" id="start-year" />
              </div>

              <div className="form-group">
                <label htmlFor="end-year">
                  End Year
                </label>
                <input onChange={props.handleEndYear} type="text" className="form-control" id="end-year" />
              </div>

              <button onClick={props.handleFormSubmit} type="submit" className="btn btn-primary">
                Submit
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>

    <br /><br />

    <div className="row">
      <div className="col-lg-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">
              Results:
            </h3>
          </div>
          <div className="panel-body">
            {props.renderArticles()}
          </div>
        </div>
      </div>
    </div>
    <br /><br />
  </div>


export default Search;