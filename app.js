// 1. KẾT NỐI DOM
const taskInput = document.getElementById('task-input');
const taskNote = document.getElementById('task-note');
const taskDate = document.getElementById('task-date');
const taskPriority = document.getElementById('task-priority');
const addBtn = document.getElementById('add-btn');
const updateBtn = document.getElementById('update-btn');
const cancelBtn = document.getElementById('cancel-btn');

const searchInput = document.getElementById('search-input');
const taskList = document.getElementById('task-list');
const filterMenuItems = document.querySelectorAll('#filter-menu li');

// DOM của các ô Thống kê
const statTotal = document.getElementById('stat-total');
const statPending = document.getElementById('stat-pending');
const statCompleted = document.getElementById('stat-completed');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingId = null; 
let currentFilter = 'all'; // Trạng thái bộ lọc hiện tại

// 2. HÀM TIỆN ÍCH
function generateID() { return Math.random().toString(36).substring(2, 9); }
function sanitizeInput(str) { const div = document.createElement('div'); div.textContent = str; return div.innerHTML; }
function saveToLocalStorage() { localStorage.setItem('tasks', JSON.stringify(tasks)); }

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-check-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function formatDateTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
}
function isOverdue(dateString, isCompleted) {
    if (!dateString || isCompleted) return false;
    return new Date(dateString) < new Date();
}

// 3. LOGIC DỮ LIỆU
function handleTaskSubmit() {
    const title = taskInput.value.trim();
    if (title === '') { showToast("Vui lòng nhập tên công việc!", "warning"); taskInput.focus(); return; }

    const newTaskData = {
        title: sanitizeInput(title),
        note: sanitizeInput(taskNote.value.trim()),
        dueDate: taskDate.value,
        priority: taskPriority.value,
        completed: false
    };

    if (editingId) {
        tasks = tasks.map(t => t.id === editingId ? { ...t, ...newTaskData, completed: t.completed } : t);
        showToast("Cập nhật thành công!", "success");
    } else {
        newTaskData.id = generateID();
        tasks.unshift(newTaskData); // Thêm lên đầu danh sách
        showToast("Đã thêm công việc!", "success");
    }
    
    resetForm();
    saveToLocalStorage();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    taskInput.value = task.title; taskNote.value = task.note; taskDate.value = task.dueDate; taskPriority.value = task.priority;
    editingId = id;
    addBtn.style.display = 'none'; updateBtn.style.display = 'flex'; cancelBtn.style.display = 'flex';
    taskInput.focus();
}

function resetForm() {
    taskInput.value = ''; taskNote.value = ''; taskDate.value = ''; taskPriority.value = 'medium';
    editingId = null;
    addBtn.style.display = 'flex'; updateBtn.style.display = 'none'; cancelBtn.style.display = 'none';
}

function deleteTask(id) {
    if(confirm("Xóa công việc này?")) {
        tasks = tasks.filter(t => t.id !== id);
        saveToLocalStorage(); renderTasks(); showToast("Đã xóa!", "success");
    }
}

function toggleComplete(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveToLocalStorage(); renderTasks();
}

// Cập nhật các ô số liệu (Stat Cards)
function updateStats() {
    statTotal.textContent = tasks.length;
    statPending.textContent = tasks.filter(t => !t.completed).length;
    statCompleted.textContent = tasks.filter(t => t.completed).length;
}

// 4. RENDER VÀ TÌM KIẾM
function renderTasks() {
    updateStats(); // Cập nhật Dashboard thống kê
    taskList.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    let filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm) || task.note.toLowerCase().includes(searchTerm);
        const matchesFilter = currentFilter === 'all' || 
                              (currentFilter === 'pending' && !task.completed) || 
                              (currentFilter === 'completed' && task.completed);
        return matchesSearch && matchesFilter;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<div class="empty-state"><i class="fas fa-folder-open"></i><p>Không có dữ liệu phù hợp.</p></div>`;
        return;
    }

    filteredTasks.forEach(task => {
        const overdue = isOverdue(task.dueDate, task.completed);
        const timeDisplay = task.dueDate ? `<div class="task-meta ${overdue ? 'overdue' : ''}"><i class="far fa-clock"></i> ${formatDateTime(task.dueDate)} ${overdue ? '(Quá hạn)' : ''}</div>` : '';
        const noteDisplay = task.note ? `<div class="task-note">${task.note}</div>` : '';

        const li = document.createElement('li');
        li.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="task-header">
                <span class="task-title">${task.title}</span>
                <div class="task-actions">
                    <button class="btn-complete" onclick="toggleComplete('${task.id}')" title="Hoàn thành"><i class="fas fa-check-circle"></i></button>
                    <button class="btn-edit" onclick="editTask('${task.id}')" title="Sửa"><i class="fas fa-pen"></i></button>
                    <button class="btn-delete" onclick="deleteTask('${task.id}')" title="Xóa"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            ${noteDisplay}
            ${timeDisplay}
        `;
        taskList.appendChild(li);
    });
}

// 5. LẮNG NGHE SỰ KIỆN
addBtn.addEventListener('click', handleTaskSubmit);
updateBtn.addEventListener('click', handleTaskSubmit);
cancelBtn.addEventListener('click', resetForm);
searchInput.addEventListener('input', renderTasks);

// Xử lý click trên Menu Sidebar
filterMenuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Xóa class active ở tất cả, thêm vào thẻ được click
        filterMenuItems.forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        
        // Cập nhật biến filter và render lại
        currentFilter = this.getAttribute('data-filter');
        renderTasks();
    });
});

renderTasks();