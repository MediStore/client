import React from 'react'
import { IonToast } from '@ionic/react'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'
import { State as ReducerState } from 'reducers'

export type Props = {
  open: boolean
  message?: string
  hideToast: () => void
}

const toastTimeout = 7000

class Component extends React.Component<Props> {
  render() {
    const { open, message, hideToast } = this.props
    return (
      <IonToast
        isOpen={open}
        onDidDismiss={hideToast}
        message={message || ''}
        position="bottom"
        buttons={[
          {
            icon: 'close',
            role: 'cancel',
            handler: hideToast,
          },
        ]}
        color="primary"
      />
    )
  }

  componentDidUpdate({ open, hideToast }: Props) {
    // previous props
    if (open) return
    setTimeout(hideToast, toastTimeout)
  }
}

const mapStateToProps = (state: ReducerState) => ({
  open: Boolean(state.App.toast),
  message: state.App.toast,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      hideToast: () => ({
        type: constants.HIDE_TOAST,
      }),
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Component)
