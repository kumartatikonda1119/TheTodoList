import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user._id
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "todo created successfully", newTodo });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }
);
    res.status(201).json({ message: "todos retrieved successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in todo fetching" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ message: "todos updated successfully", todo });
} catch (error) {
    console.log(error);
    console.log(error);
    res.status(400).json({ message: "error in todo updating" });
}
};

export const deleteTodo = async (req, res) =>{
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if(!todo) {
            return res.status(404).json({ message: "todo not found" });
        }
        res.status(201).json({ message: "todos deleted successfully" });
    }
    catch(error) {
        res.status(400).json({ message: "error in todo deletion" });
        console.log(error);
    }
}
