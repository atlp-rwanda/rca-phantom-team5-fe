import { connect } from 'react-redux'
import React, { Component } from 'react'

import { initial } from '../../actions'
import logo from '../../assets/images/logo.svg'

class App extends Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      data: {},
      loading: null
    }
  }

  componentDidMount () {
    this.props.currentInital()
  }

  UNSAFE_componentWillReceiveProps (props: any) {
    if (props.initialLoading === true) {
      this.setState({ loading: props.initialLoading, data: { ...props.initialData } })
    }

    if (props.initialLoading === false) {
      this.setState({ loading: props.initialLoading, data: props.initialData })
    }
  }

  render () {
    const { loading, data } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            { loading === true ? data.message : null }
          </p>
          <a
            target="_blank"
            className="App-link"
            rel="noopener noreferrer"
            href="https://reactjs.org"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

const mapStateToProps = ({ initialInitialState }: any) => (
  {
    initialLoading: initialInitialState.loading,
    initialData: initialInitialState.data
  }
)

const mapDispatchToProps = (dispatch: any) => (
  {
    currentInital: () => {
      dispatch(initial())
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
