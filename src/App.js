import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  function handleItem(newItem) {
    setItems((items) => {
      console.log('new items: ', newItem.id);
      return [...items, newItem];
    });
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    console.log('item delete: ', id);
  }

  function handleToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggle}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);

  function handleForm(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItem(newItem);
  }

  return (
    <form className='add-form' onSubmit={handleForm}>
      <h3>What do you need for your 😍 trips?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percetagePacked = Math.round((numPacked / numItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percetagePacked === 100
          ? 'You got everything! Ready yo go ✈️'
          : `🧳 You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percetagePacked}%)`}
      </em>
    </footer>
  );
}

export default App;
