import React, { Component, PropTypes } from 'react';

class TextFieldLocked extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erInaktiv: true,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.erInaktiv !== prevState.erInaktiv) {
            setTimeout(() => {
                this.refs.input.focus();
                this.refs.input.select();
            }, 0);
        }
    }

    render() {
        const { meta, placeholder, type, id, className, input } = this.props;
        return (<div>
            <div className="textfieldLocked">
            <input ref="input" disabled={this.state.erInaktiv} autoComplete="off" placeholder={placeholder} type={type || 'text'} id={id}
                className={`${className}${meta.touched && meta.error ? ' input--feil' : ''}`} {...input} />
                {
                    this.state.erInaktiv && <button onClick={() => {
                        this.setState({
                            erInaktiv: false,
                        });
                    }} className="textfieldLocked__rediger js-rediger" aria-controls={id}>Rediger</button>
                }
            </div>
            <p className="skjema__feilmelding" aria-live="polite">{meta.touched && meta.error}</p>
        </div>);
    }
}

TextFieldLocked.propTypes = {
    meta: PropTypes.object,
    id: PropTypes.string,
    input: PropTypes.object,
    type: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};

export default TextFieldLocked;
