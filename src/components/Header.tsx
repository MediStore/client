import React from 'react'
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/react'

import { ToolbarAction } from 'types'

const appName = 'App'

export type Props = {
  omitsBack?: boolean
  title?: any
  size?: 'small' | 'large'
  actions?: Array<ToolbarAction>
}

const buttonStyle = {
  textTransform: 'unset'
}

const Component: React.FC<Props> = ({ omitsBack, title, size, actions = [] }) => {
  return (
    <IonHeader>
      <IonToolbar /* color="primary" */>
        {omitsBack ? null : <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>}
        <IonTitle size={size}>{title}</IonTitle>
        <IonButtons slot="secondary">{
          actions.map((
            { icon, text, component: Component, handler },
            i
          ) => <IonButton
            key={i}
            onClick={handler}
            style={buttonStyle}
          >
              {
                icon ? <IonIcon icon={icon} /> : null
              }{
                text ? text : null
              }{
                Component ? <Component /> : null
              }
            </IonButton>
          )
        }</IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

Component.defaultProps = { title: appName, size: 'large' }

export default Component