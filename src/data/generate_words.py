import random
import os

# Try to use the system dictionary if available
words_file = '/usr/share/dict/words'
output_file = 'words.txt'
num_words = 10000

words = []
if os.path.exists(words_file):
    with open(words_file, 'r') as f:
        words = [line.strip() for line in f if line.strip().isalpha() and len(line.strip()) < 6]
else:
    # Fallback: a small set of common words
    words = [
        'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog',
        'hello', 'world', 'apple', 'grape', 'melon', 'kiwi', 'pear', 'peach',
        'cat', 'dog', 'mouse', 'bird', 'fish', 'horse', 'sheep', 'cow', 'test', 'code'
    ]
    words = [w for w in words if len(w) < 6]

if not words:
    raise ValueError('No words found under 6 letters!')

random_words = [random.choice(words) for _ in range(num_words)]

with open(output_file, 'w') as f:
    for word in random_words:
        f.write(word + '\n')

print(f"Generated {num_words} random words (all under 6 letters) in {output_file}") 