let groupCount = 2; // To keep track of the number of groups

// Function to calculate the time per task
function calculateTimePerTask(set) {
    var numTasks = document.getElementById('numTasks' + set).value;
    var hoursWorked = document.getElementById('hoursWorked' + set).value;

    if (numTasks && hoursWorked && numTasks > 0) {
        var timePerTaskInHours = hoursWorked / numTasks;
        var timePerTaskInMinutes = timePerTaskInHours * 60; // Convert hours to minutes
        document.getElementById('timePerTask' + set).value = timePerTaskInMinutes.toFixed(2); // Showing 2 decimal places
    } else {
        document.getElementById('timePerTask' + set).value = '';
    }
}

// Function to add a new input group
function addNewGroup() {
    groupCount++; // Increment the group count

    // Clone the first group and modify its IDs
    var newGroup = document.getElementById('group1').cloneNode(true);

    // Update IDs to ensure uniqueness
    var newGroupId = 'group' + groupCount;
    newGroup.id = newGroupId;

    // Update the IDs for all the inputs within the new group
    var inputs = newGroup.getElementsByTagName('input');
    inputs[0].id = 'numTasks' + groupCount;
    inputs[1].id = 'hoursWorked' + groupCount;
    inputs[2].id = 'timePerTask' + groupCount;

    // Update the editable label
    var editableLabel = newGroup.querySelector('.editable-label');
    editableLabel.id = 'label' + groupCount;
    editableLabel.textContent = 'Number of Tasks';

    // Clear values of the newly added group
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

    // Add delete button to the new group
    var deleteButton = newGroup.querySelector('.delete-btn');
    deleteButton.setAttribute('onclick', 'deleteGroup("' + newGroupId + '")');

    // Add the oninput event for the newly added inputs
    newGroup.querySelector('#numTasks' + groupCount).setAttribute('oninput', 'calculateTimePerTask(' + groupCount + ')');
    newGroup.querySelector('#hoursWorked' + groupCount).setAttribute('oninput', 'calculateTimePerTask(' + groupCount + ')');

    // Append the new group to the form container
    document.getElementById('formContainer').appendChild(newGroup);
}

// Function to set the label as fixed once the user finishes editing it
function setLabelFixed(set) {
    var label = document.getElementById('label' + set);
    label.setAttribute('contenteditable', 'false'); // Disable content editing
}

// Function to delete a specific group
function deleteGroup(groupId) {
    var group = document.getElementById(groupId);
    if (group) {
        group.remove();
    }
}
