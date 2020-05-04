import React, { Component } from "react";
//1 - pobieram funkcje
import { getProject, createProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateProject extends Component {
  //set state
  constructor() {
    super();

    this.state = {
      id: "",
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
      //objekt z errorami
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //nextProps - zwraca props z danymi projektu
  componentWillReceiveProps(nextProps) {
    //jezeli mam błędy wstawiam je do obiektu errors 
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    //ustalenia wartosci this.state na dane z wybranego obiektu na starcie
    const {
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date
    } = nextProps.project;

    //ustawianie wartosci w tym projekcie (this.setState)
    //wywołanie onChange (również przy pierwszym załadowaniu strony)
    this.setState({
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date
    });
  }

  componentDidMount() {
    //id uzyskuje ze scieżki (match.params)
    const { id } = this.props.match.params;
    //pobieram z bazy danych
    this.props.getProject(id, this.props.history);
  }

  onChange(e) {
    //wymaga bind w formularzu aby wprowadzać dane
    //dluższe rozwiązanie dla każdej zmiennej -> this.setState({projectName: e.target.value});
    //e.target - setState ustawia value wybranego elementu po evencie na danym name 
    //[] - for each
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    //refresh
    e.preventDefault();
    //aktualizacja danych
    const updateProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };
    //przekazuje dane do funkcji tworzenia (baza traktuje to jak update) 
    // i history do przekierwania na dashboard
    //wymaga = this.onSubmit = this.onSubmit.bind(this);
    this.props.createProject(updateProject, this.props.history);
  }

  render() {
    //pobieram dane projektu od dashboard
    //<span className="mx-auto">{project.projectIdentifier}</span> = przykład wyświetlenia danych    
    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Project form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    //https://getbootstrap.com/docs/4.3/components/forms/#how-it-works
                    //           () = zbiór ciągów znaków dzięki classnames, 
                    //wewnetrzny {} = zbiór zmiennych wartości, tutaj klasa bootstrapa invalid class dla errorów,
                    //zewnetrzny {} = opakowanie dla className
                    //is-invalid - kolor obwodu pola w formularzu na czerwony              
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectName
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.onChange}
                  />
                  {errors.projectName && (
                    //Bootstrap klasa do zwracania informacji o błędzie na czerwono
                    <div className="invalid-feedback">{errors.projectName}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={this.state.projectIdentifier}
                    onChange={this.onChange}
                    //disabled - blokuje zmiany
                    disabled
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description
                    })}
                    placeholder="Project Description"
                    name="description"
                    onChange={this.onChange}
                    value={this.state.description}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={this.state.start_date}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={this.state.end_date}
                    onChange={this.onChange}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4" value="akceptuj"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//przekazuje funkcje, isRequired oznacza że jest niezbędna do działania componentu
//jednocześnie określa wymagany typ uzyskanego prop
//3 - tworze prop dla każdego z obiektów
UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
//przyjmuje parametr state i podłącza np. errory to state errors (mappuje do componentu aplikacji)

const mapStateToProps = state => ({
  project: state.project.project,
  errors: state.errors
});
//2 - podłączam do projektu
export default connect(
  mapStateToProps,
  { getProject, createProject }
)(UpdateProject);
