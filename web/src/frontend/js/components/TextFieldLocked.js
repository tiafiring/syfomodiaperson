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
            }, 0);
        }
    }

    render() {
        const { meta, placeholder, type, id, className, input } = this.props;
        return (<div className={meta.touched && meta.error && 'feil'}>
            <input ref="input" disabled={this.state.erInaktiv} autoComplete="off" placeholder={placeholder} type={type || 'text'} id={id}
                className={className} {...input} />
                {
                    this.state.erInaktiv && <button onClick={() => {
                        this.setState({
                            erInaktiv: false,
                        });
                    }} className="knapp knapp--liten js-rediger">Rediger</button>
                }
            <p className="skjema-feilmelding" aria-live="polite">{meta.touched && meta.error}</p>
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
