<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "root";
$database = "company-db";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $companyName = $_POST['companyName'];
    $country = $_POST['country'];
    $street = $_POST['street'];
    $city = $_POST['city'];
    $state = $_POST['state'];

    $sql = "INSERT INTO companies (company_name, country, street, city, state) VALUES ('$companyName', '$country', '$street', '$city', '$state')";
    
    if ($conn->query($sql) === TRUE) {
        $companyId = $conn->insert_id;

        if (isset($_POST['units']) && is_array($_POST['units'])) {
            foreach ($_POST['units'] as $unit) {
                $unitName = $unit['unitName'];
                $unitQuantity = (int)$unit['unitQuantity'];
                $unitPrice = (float)$unit['unitPrice'];

                $unitSql = "INSERT INTO units (company_id, unit_name, unit_quantity, unit_price) 
                            VALUES ('$companyId', '$unitName', '$unitQuantity', '$unitPrice')";
                $conn->query($unitSql);
            }
        }

        echo json_encode(["message" => "Company and units added successfully"]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
}

if ($method == 'GET') {
    $sql = "SELECT c.id, c.company_name, c.country, c.street, c.city, c.state, 
                   u.id as unit_id, u.unit_name, u.unit_quantity, u.unit_price 
            FROM companies c
            LEFT JOIN units u ON c.id = u.company_id";
    
    $result = $conn->query($sql);
    $companies = [];

    while ($row = $result->fetch_assoc()) {
        $companyId = $row['id'];

        if (!isset($companies[$companyId])) {
            $companies[$companyId] = [
                "id" => $row["id"],
                "company_name" => $row["company_name"],
                "country" => $row["country"],
                "street" => $row["street"],
                "city" => $row["city"],
                "state" => $row["state"],
                "units" => []
            ];
        }

        if (!empty($row["unit_id"])) {
            $companies[$companyId]["units"][] = [
                "unit_id" => $row["unit_id"],
                "unit_name" => $row["unit_name"],
                "unit_quantity" => $row["unit_quantity"],
                "unit_price" => $row["unit_price"]
            ];
        }
    }

    echo json_encode(array_values($companies));
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $data = json_decode(file_get_contents("php://input"), true);

    $companyName = $data['companyName'];
    $country = $data['country'];
    $street = $data['street'];
    $city = $data['city'];
    $state = $data['state'];

    $updateQuery = "UPDATE companies SET 
        company_name='$companyName', country='$country', 
        street='$street', city='$city', state='$state' 
        WHERE id=$id";
    
    if (mysqli_query($conn, $updateQuery)) {
        echo json_encode(["message" => "Company updated successfully", "updatedData" => $data]);
    } else {
        echo json_encode(["error" => "Failed to update"]);
    }
}


if ($method == 'DELETE' && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    
    $conn->query("DELETE FROM units WHERE company_id = $id");
    $conn->query("DELETE FROM companies WHERE id = $id");

    echo json_encode(["message" => "Company and units deleted successfully"]);
}

$conn->close();
?>
