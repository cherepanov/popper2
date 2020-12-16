import * as React from 'react'
import { render } from 'react-dom'
import { Popper, Target, Manager } from 'react-popper'
import { css } from 'emotion'

interface OpenManagerProps {
  readonly children: (props: {
    readonly isOpen: boolean
    readonly toggleOpen: () => void
  }) => any
}

class OpenManager extends React.Component<
  OpenManagerProps,
  {
    readonly isOpen: boolean
  }
> {
  public constructor(props: OpenManagerProps) {
    super(props)
    this.state = {
      isOpen: false
    }
  }
  public render() {
    const { isOpen } = this.state
    return this.props.children({
      isOpen,
      toggleOpen: this.toggleOpen
    })
  }
  private toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
}

const App = () => (
  <OpenManager>
    {({ isOpen, toggleOpen }) => {
      return (
        <Manager>
          <Target>
            {(targetProps) => {
              return (
                <div
                  className={css`
                    width: 100px;
                    height: 100px;
                    background-color: gray;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    overflow: hidden;
                  `}
                  onMouseEnter={toggleOpen}
                  onMouseLeave={toggleOpen}
                >
                  Target
                </div>
              )
            }}
          </Target>
          <Popper>
            {(popperProps) => {
              return (
                <div
                  className={css`
                    background-color: #999;
                    color: #fff;
                    width: 100px;
                    height: 100px;
                    border-radius: 5px;
                    display: ${isOpen ? 'flex' : 'none'};
                    align-items: center;
                    justify-content: center;
                  `}
                >
                  Popper
                </div>
              )
            }}
          </Popper>
        </Manager>
      )
    }}
  </OpenManager>
)

render(<App />, document.getElementById('root'))
