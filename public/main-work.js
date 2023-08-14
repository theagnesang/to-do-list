function editWorkTask(buttonElement, tId) {
    console.log("Editing work task", tId);
    const inputElement = buttonElement.previousElementSibling;

    if (inputElement.readOnly) {
        inputElement.readOnly = false;
        buttonElement.textContent = "Save";
    } else {
        inputElement.readOnly = true;
        buttonElement.textContent = "Edit";

        // Send the updated task description to the server
        fetch(`/work-tasks/${tId}/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: inputElement.value })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Work task edited");
        })
        .catch(error => {
            console.log('There was a problem with the fetch operation:', error.message);
            // Handle errors (like reverting the changes or showing an error message)
        })
    };
};

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('change', (event) => {
        const changedElement = event.target;

        if (changedElement.type === 'checkbox' && changedElement.name === 'completed') {
            const tId = changedElement.closest('.item-wrap').querySelector('.task-description').getAttribute('data-id');
            const newStatus = changedElement.checked;

            // Send the updated task completion status to the server
            fetch(`/work-tasks/${tId}/toggle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: newStatus })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Work task status updated successfully');
                
                // Apply or remove the completed class based on the new status
                const descriptionElement = changedElement.closest('.item-wrap').querySelector('.task-description');
                if (newStatus) {
                    descriptionElement.classList.add('completed');
                } else {
                    descriptionElement.classList.remove('completed');
                }
            })
            .catch(error => {
                console.log('There was a problem with the fetch operation:', error.message);
            });
        }
    });
});