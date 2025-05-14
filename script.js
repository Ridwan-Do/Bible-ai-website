// Bible data structure
const bibleData = {
    "Genesis": { chapters: 50, verses: {1: [31], 2: [25], /* ... */ } },
    "Exodus": { chapters: 40, verses: {1: [22], /* ... */ } },
    // Add all 66 books (find verse counts at https://www.owlcation.com/humanities/Bible-Book-Chapter-Verse-Counts)
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

async function generateAIResponse(question) {
    // Developer identification (keeps your credit)
    if (question.toLowerCase().includes('developer')) {
        return "This website was developed by Damilare Oyinloye to help people study the Bible.";
    }

    // Connect to OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer YOUR_OPENAI_KEY`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are a knowledgeable Christian AI assistant. Provide concise, biblical answers. Always cite scripture when possible."
            }, {
                role: "user",
                content: question
            }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
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
