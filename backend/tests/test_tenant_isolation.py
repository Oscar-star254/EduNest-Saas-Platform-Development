def test_school_can_only_list_its_students(client, school_a_headers, school_b_headers):
    school_a = client.get("/api/v1/students", headers=school_a_headers).get_json()["data"]["items"]
    school_b = client.get("/api/v1/students", headers=school_b_headers).get_json()["data"]["items"]

    assert school_a
    assert school_b
    assert {student["school_id"] for student in school_a} == {"school-a"}
    assert {student["school_id"] for student in school_b} == {"school-b"}
    assert {student["id"] for student in school_a}.isdisjoint({student["id"] for student in school_b})


def test_school_cannot_read_another_school_student(client, school_a_headers, school_b_headers):
    foreign_student = client.get("/api/v1/students", headers=school_b_headers).get_json()["data"]["items"][0]
    response = client.get(f"/api/v1/students/{foreign_student['id']}", headers=school_a_headers)
    assert response.status_code == 404


def test_client_school_id_is_ignored_on_create(client, school_a_headers):
    response = client.post(
        "/api/v1/students",
        headers=school_a_headers,
        json={"name": "Tenant Safe Learner", "class_name": "Grade 5A", "school_id": "school-b"},
    )
    assert response.status_code == 201
    assert response.get_json()["data"]["school_id"] == "school-a"
