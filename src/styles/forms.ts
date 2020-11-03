import styled from 'styled-components'

export const StyledForm = styled.form`
  ons-input[disabled] {
    opacity: .75 !important;
  }

  .text-input:disabled {
    opacity: .75 !important;
  }

  .textarea:disabled {
    opacity: .75 !important;
    padding: 0;
    border: 0;
    margin-top: 5px;
  }

  .opacity-100 {
    opacity: 1 !important;
  }

  .opacity-75 {
    opacity: .75 !important;
  }

  .button[disabled] {
    opacity: .75 !important;
  }
`