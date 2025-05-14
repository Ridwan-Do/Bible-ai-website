// Bible data structure
const bibleData = {
    "Genesis": {
        chapters: 50,
        verses: {
            1: [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26],
        },
        // Add more books and chapters as needed
    },
    "Exodus": {
        chapters: 40,
        verses: {
            1: [22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38],
        },
    },
    // Add more books...
};

// Initialize book dropdown
const bookSelect = document.getElementById('book');
Object.keys(bibleData).forEach(book => {
    const option = document.createElement('option');
    option.value = book;
    option.textContent = book;
    bookSelect.appendChild(option);
});

// Update chapters when book is selected
bookSelect.addEventListener('change', function() {
    const chapterSelect = document.getElementById('chapter');
    chapterSelect.innerHTML = '';
    const book = this.value;
    for (let i = 1; i <= bibleData[book].chapters; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        chapterSelect.appendChild(option);
    }
    chapterSelect.dispatchEvent(new Event('change'));
});

// Update verses when chapter is selected
document.getElementById('chapter').addEventListener('change', function() {
    const verseSelect = document.getElementById('verse');
    verseSelect.innerHTML = '';
    const book = bookSelect.value;
    const chapter = this.value;
    for (let i = 1; i <= bibleData[book].verses[chapter]; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        verseSelect.appendChild(option);
    }
});

// Fetch verse when button is clicked
document.getElementById('fetchVerse').addEventListener('click', async function() {
    const book = bookSelect.value;
    const chapter = document.getElementById('chapter').value;
    const verse = document.getElementById('verse').value;
    
    try {
        const response = await fetch(
            `https://bible-api.com/${book}+${chapter}:${verse}?translation=kjv`
        );
        const data = await response.json();
        document.getElementById('verseResult').innerHTML = `
            <h5>${book} ${chapter}:${verse} (KJV)</h5>
            <p>${data.text}</p>
        `;
    } catch (error) {
        document.getElementById('verseResult').innerHTML = "Error fetching verse. Try again.";
    }
});

// AI Chatbot functionality
document.getElementById('askQuestion').addEventListener('click', function() {
    const question = document.getElementById('userQuestion').value.trim();
    if (!question) return;
    
    addMessage(question, 'user');
    document.getElementById('userQuestion').value = '';
    
    // Simulate AI thinking
    setTimeout(() => {
        const response = generateAIResponse(question);
        addMessage(response, 'ai');
    }, 1000);
});

function addMessage(text, sender) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender + '-message';
    messageDiv.textContent = text;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function generateAIResponse(question) {
    // Check for developer question
    if (question.toLowerCase().includes('developer') || 
        question.toLowerCase().includes('who made this') ||
        question.toLowerCase().includes('who created this')) {
        return "This website was developed by Damilare Oyinloye to help people study the Bible and grow in their faith.";
    }
    
    // Sample responses for common questions
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('god') || lowerQuestion.includes('who is god')) {
        return "God is the eternal, all-powerful, all-knowing creator of the universe who reveals Himself through Scripture and Jesus Christ (Genesis 1:1, John 1:1-14).";
    }
    
    if (lowerQuestion.includes('jesus') || lowerQuestion.includes('who is jesus')) {
        return "Jesus Christ is the Son of God, fully God and fully man, who came to earth to save sinners through His death and resurrection (John 3:16, Philippians 2:5-11).";
    }
    
    if (lowerQuestion.includes('salvation') || lowerQuestion.includes('saved')) {
        return "Salvation comes by grace through faith in Jesus Christ alone (Ephesians 2:8-9). It involves repentance from sin and trusting in Christ's finished work on the cross.";
    }
    
    if (lowerQuestion.includes('bible') || lowerQuestion.includes('scripture')) {
        return "The Bible is God's inspired, authoritative Word, consisting of 66 books written by human authors under the Holy Spirit's guidance (2 Timothy 3:16-17).";
    }
    
    if (lowerQuestion.includes('pray') || lowerQuestion.includes('prayer')) {
        return "Prayer is communicating with God. You can pray anytime, anywhere. The Lord's Prayer (Matthew 6:9-13) is a great model for how to pray.";
    }
    
    // Default response
    return "Thank you for your question about Christianity. While I'm a simple AI, I encourage you to search the Scriptures (John 5:39) and consult with mature believers for deeper understanding of this topic.";
                }
