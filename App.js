import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      todos: [],
    };
  }

  handleToggle = index => {
    const todos = Array.from(this.state.todos);
    todos[index].completed = !todos[index].completed;
    this.setState({ todos });
  };

  handleButtonPress = () => {
    this.setState(prevState => {
      let { text, todos } = prevState;
      return {
        text: '',
        todos: [...todos, { key: text + todos.length, text, completed: false /* completed */ }],
      };
    });
    console.log(this.state.todos);
  };

  handleTextChange = text => {
    this.setState({ text });
  };

  render() {
    return (
      <View style={container}>
        {this.state.todos.length === 0 ? (
          <Text style={textFont}>You're free</Text>
        ) : (
          <Text style={textFont}>You got stuff to do!</Text>
        )}
        <TextInput
          style={inputBox}
          onChangeText={this.handleTextChange}
          value={this.state.text}
          placeholder="Add Todo"
        />
        <Button onPress={() => this.handleButtonPress()} title="Add Todo" />
        <FlatList
          extraData={this.state}
          data={this.state.todos}
          renderItem={({ item, index }) => {
            const todoStyle = item.completed ? { textDecorationLine: 'line-through' } : null;
            return (
              <View key={item.key}>
                <Text onPress={() => this.handleToggle(index)} style={todoStyle}>
                  {item.text}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 33,
  },
  textFont: {
    fontSize: 28,
  },
  inputBox: {
    width: 300,
    height: 40,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
});

const { container, textFont, inputBox } = styles;
