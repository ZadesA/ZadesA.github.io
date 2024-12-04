function updateLength() {
    const length = document.getElementById('length').value;
    document.getElementById('lengthValue').textContent = length;
  }
  
  function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
  
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  
    let characterPools = [];
    characterPools.push(lowercase);
    if (includeSymbols) characterPools.push(symbols);
    if (includeUppercase) characterPools.push(uppercase);
    if (includeNumbers) characterPools.push(numbers);
  
    if (characterPools.length === 0) {
      alert('Please select at least one character set!');
      return;
    }
  
    let password = '';
    let usedPools = Array(characterPools.length).fill(false);
  
    for (let i = 0; i < length; i++) {
      let poolIndex;
      do {
        poolIndex = Math.floor(Math.random() * characterPools.length);
      } while (i < characterPools.length && usedPools[poolIndex]);
  
      const charPool = characterPools[poolIndex];
      password += charPool[Math.floor(Math.random() * charPool.length)];
      usedPools[poolIndex] = true;
    }
  
    password = shuffleString(password);
  
    document.getElementById('password').value = password;
  }
  

  function shuffleString(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
  }
  

  function copyToClipboard() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);
    document.execCommand('copy'); 
  
    alert('Password copied to clipboard.');
  }
  