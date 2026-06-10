import { Component } from "react"
export default class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(e, i) { console.error("[EB]", e, i) }
  render() { return this.state.hasError ? (this.props.fallback ?? null) : this.props.children }
}
