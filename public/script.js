const form = document.getElementById("inventoryForm");
const table = document.getElementById("inventoryTable");

const API_URL = "/api/inventory";

// Load inventory items
async function loadInventory() {
    try {
        const response = await fetch(API_URL);
        const items = await response.json();

        table.innerHTML = "";

        if (items.length === 0) {
            table.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        No inventory items found.
                    </td>
                </tr>
            `;
            return;
        }

        items.forEach(item => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>${item.supplier}</td>
                <td>
                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteItem('${item._id}')"
                    >
                        Delete
                    </button>
                </td>
            `;

            table.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading inventory:", error);
    }
}


// Add new inventory item
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const item = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        quantity: Number(document.getElementById("quantity").value),
        price: Number(document.getElementById("price").value),
        supplier: document.getElementById("supplier").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        if (response.ok) {
            form.reset();
            loadInventory();
        } else {
            alert("Failed to add inventory item.");
        }

    } catch (error) {
        console.error("Error adding item:", error);
    }
});


// Delete inventory item
async function deleteItem(id) {
    if (!confirm("Are you sure you want to delete this item?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            loadInventory();
        } else {
            alert("Failed to delete item.");
        }

    } catch (error) {
        console.error("Error deleting item:", error);
    }
}


// Load data when page opens
loadInventory();
