//  on pageload, text should show: a header (H1 size), a sub header (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text
const defaultText = '# H1 Header\n\n## H2 Header\n\n[Markdown on Wikipedia](https://en.wikipedia.org/wiki/Markdown)\n\ninline code: `<addr>`\n\ncode block: ```const code = true;```\n\nlist item:\n* item1\n* item2\n\nblockquote:\n>Eat, sleep, code\n\nimage: ![alt text](https://upload.wikimedia.org/wikipedia/commons/7/7c/The_Enforced_Idleness_of_Mars%29_by_artist_David_Rijckaert_III.jpg)\n\n**bold text**';
const defaultMarkdown = marked(defaultText, { sanitize: true });

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: defaultText,
      markdown: defaultMarkdown
    }
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value,
      markdown: marked(event.target.value, { sanitize: true })
    });
  }
  reset() {
    this.setState({
      input: '',
      markdown: ''
    });
  }
  render() {
    return (
      <div>
        <h1>Markdown Previewer</h1>
        <h2>Text: <button onClick={this.reset}>Clear</button></h2>
        <textarea id='editor' rows='21' cols='80'
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <h2>Preview:</h2>
        <div id='preview' dangerouslySetInnerHTML={{__html: this.state.markdown}}/>
      </div>
    );
  }
};

ReactDOM.render(<Presentational/>, document.getElementById('app-node'));
