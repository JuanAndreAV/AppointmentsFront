let formError = document.getElementById('formError');
let enviarForm = document.getElementById('enviarBtn');
let editarBtn = document.getElementById('editarBtn');
let box = document.getElementById('box-btn');
let id = "";
let isEditable = false;

const dataBtn = document.getElementById('mostrarCitas');
dataBtn.addEventListener('click', () => showData());

// Ocultar el botón de editar inicialmente
editarBtn.style.display = 'none';

// Función para enviar el formulario
async function enviarFormulario() {
    let patientName = document.getElementById('patientName').value;
    let phone = document.getElementById('phone').value;
    let consultType = document.getElementById('consultType').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let reason = document.getElementById('reason').value;

    // Validar campos
    if (!patientName) {
        formError.innerText = 'Valida el nombre del paciente';
        return;
    }
    if (!phone) {
        formError.innerText = 'Valida el teléfono';
        return;
    }
    if (!consultType) {
        formError.innerText = 'Valida el tipo de consulta';
        return;
    }
    if (!date) {
        formError.innerText = 'Valida la fecha';
        return;
    }
    if (!time) {
        formError.innerText = 'Valida la hora';
        return;
    }
    if (!reason) {
        formError.innerText = 'Valida el motivo';
        return;
    }

    formError.innerText = '';

    // Crear objeto con los datos del formulario
    const data = { patientName, phone, consultType, date, time, reason };

    try {
        const response = await fetch('http://localhost:3600/citas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Cita registrada con éxito');
            showData(); // Actualizar la tabla después de agregar una cita
        } else {
            alert('Error al registrar la cita');
        }
    } catch (error) {
        alert(`Error: ${error}`);
    }
}

// Función para mostrar las citas
async function showData() {
    try {
        const response = await fetch('http://localhost:3600/citas');
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        const appoinmentData = data.message;

        let appoinmentTable = document.getElementById('citas');
        appoinmentTable.innerHTML = '';

        appoinmentData.forEach((element) => {
            appoinmentTable.innerHTML += `
                <tr class="border-b">
                    <td class="p-3">${element.patientName}</td>
                    <td class="p-3">${element.phone}</td>
                    <td class="p-3">${element.consultType}</td>
                    <td class="p-3">${element.date}</td>
                    <td class="p-3">${element.time}</td>
                    <td class="p-3">${element.reason}</td>
                    <td class="p-3">
                        <button class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onclick='edit(${JSON.stringify(element)})'>Editar</button>
                        <button class="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-600" onclick='deleteAppointment("${element._id}")'>Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.log(error);
    }
}

// Función para eliminar una cita
async function deleteAppointment(id) {
    if (confirm('¿Estás seguro de eliminar esta cita?')) {
        try {
            const response = await fetch(`http://localhost:3600/citas/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Cita eliminada con éxito');
                showData(); // Actualizar la tabla después de eliminar
            } else {
                alert('Error al eliminar la cita');
            }
        } catch (error) {
            alert(`Error: ${error}`);
        }
    }
}

// Función para editar una cita
async function edit(elementos) {
    id = elementos._id;
    enviarForm.style.display = 'none';
    editarBtn.style.display = 'block';

    // Llenar el formulario con los datos de la cita seleccionada
    document.getElementById('patientName').value = elementos.patientName;
    document.getElementById('phone').value = elementos.phone;
    document.getElementById('consultType').value = elementos.consultType;
    document.getElementById('date').value = elementos.date;
    document.getElementById('time').value = elementos.time;
    document.getElementById('reason').value = elementos.reason;
}

// Función para actualizar una cita
async function patchAppoinment() {
    let patientName = document.getElementById('patientName').value;
    let phone = document.getElementById('phone').value;
    let consultType = document.getElementById('consultType').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let reason = document.getElementById('reason').value;

    // Validar campos
    if (!patientName) {
        formError.innerText = 'Valida el nombre del paciente';
        return;
    }
    if (!phone) {
        formError.innerText = 'Valida el teléfono';
        return;
    }
    if (!consultType) {
        formError.innerText = 'Valida el tipo de consulta';
        return;
    }
    if (!date) {
        formError.innerText = 'Valida la fecha';
        return;
    }
    if (!time) {
        formError.innerText = 'Valida la hora';
        return;
    }
    if (!reason) {
        formError.innerText = 'Valida el motivo';
        return;
    }

    formError.innerText = '';

    // Crear objeto con los datos del formulario
    const data = { patientName, phone, consultType, date, time, reason };

    try {
        const response = await fetch(`http://localhost:3600/editar/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Cita editada con éxito');
            editarBtn.style.display = 'none';
            enviarForm.style.display = 'block';
            showData(); // Actualizar la tabla después de editar
        } else {
            alert('Error al editar la cita');
        }
    } catch (error) {
        alert(`Error: ${error}`);
    }
}