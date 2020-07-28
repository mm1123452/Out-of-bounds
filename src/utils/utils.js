const selectCheckRadioValue = (radioArray) => {
  const selected = radioArray.find((item) => item.checked);
  return selected.value;
};

export { selectCheckRadioValue };
