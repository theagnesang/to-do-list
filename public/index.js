import express from "express";
const app = express();
const port = 3000;

import bodyParser from "body-parser";
import methodOverride from "method-override";

// Placeholder for tasks
let tasks = [];
let workTasks = [];

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride("_method"));

// Routes to display tasks
app.get("/", (req, res) => {
    res.render("index.ejs", { tasks });
    console.log("Page loaded");
});

app.get("/work", (req, res) => {
    res.render("work.ejs", { workTasks });
    console.log("Work page loaded");
});


// Routes to add tasks
app.post("/tasks", (req, res) => {
    const newTask = {
        id: Date.now(),
        description: req.body.description,
        completed: false
    };

    tasks.push(newTask);
    console.log("Task added");
    res.redirect('/');
});

app.post("/work-tasks", (req, res) => {
    const newTask = {
        id: Date.now(),
        description: req.body.description,
        completed: false
    };

    workTasks.push(newTask);
    console.log("Work task added");
    res.redirect('/work');
});

// Routes to edit tasks
app.post("/tasks/:id/edit", (req, res) => {
    const editTask = tasks.find(t => t.id === +req.params.id);

    if (editTask) {
        editTask.description = req.body.description;
        res.redirect('/');
    } else {
        res.status(404).send('Task not found');
    }
});

app.post("/work-tasks/:id/edit", (req, res) => {
    const editTask = workTasks.find(t => t.id === +req.params.id);

    if (editTask) {
        editTask.description = req.body.description;
        console.log("Work task edited");
        res.redirect('/work');
    } else {
        res.status(404).send('Task not found');
    }
});

// Routes to delete tasks
app.post("/tasks/:id", (req, res) => {
    const deleteTask = tasks.findIndex(t => 
        t.id === +req.params.id); //find the position of a specific element in the array by using a condition i.e. function

    if (deleteTask !== -1) { //can't use if (deleteTask) because there will always be a value (>=0 for the position, or -1 for elements not found)
        tasks.splice(deleteTask, 1);
        res.redirect('/');
        console.log("Task deleted");
    } else {
        res.status(404).send('Task not found');
    };    
});

app.post("/work-tasks/:id", (req, res) => {
    const deleteTask = workTasks.findIndex(t => 
        t.id === +req.params.id); //find the position of a specific element in the array by using a condition i.e. function

    if (deleteTask !== -1) { //can't use if (deleteTask) because there will always be a value (>=0 for the position, or -1 for elements not found)
        workTasks.splice(deleteTask, 1);
        res.redirect('/work');
        console.log("Work task deleted");
    } else {
        res.status(404).send('Task not found');
    };    
});

// Routes to mark tasks
app.post("/tasks/:id/toggle", (req, res) => {
    const markTask = tasks.find(t =>  //find a specific element in the array by using a condition i.e. function
        t.id === +req.params.id);  //the parameter for the function can be anything since it will be all elements in the array anyway. Just give it an identifier -> "t" in this case
                                  //every element in the array's id will be compared with the id of the user's selection for exact matching

    if (markTask) {
        markTask.completed = !markTask.completed; // Toggle the completion status
        res.sendStatus(200);
        /* res.redirect('/'); */
        console.log("Task status updated");
    } else {
        res.status(404).send('Task not found');
    }
});

app.post("/work-tasks/:id/toggle", (req, res) => {
    const markTask = workTasks.find(t =>
        t.id === +req.params.id);

    if (markTask) {
        markTask.completed = !markTask.completed; // Toggle the completion status
        res.sendStatus(200);
        /* res.redirect('/'); */
        console.log("Task status updated");
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(port, () => {
	console.log (`Server running on port ${port}`);
});