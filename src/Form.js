import { useState } from 'react';

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

export default Form;
