<?php
use App\Helpers\Mixi;
use App\Models\Role;

function gcuid()
{
    return auth()->user()->id;
}

function status($param = null, $context = null)
{
    $data = Mixi::status($context);
    return propReturn($param, $data);
}

function role($param = null)
{
    $data = Role::all()->toArray();
    return propReturn($param, $data);
}

function gender($param = null)
{
    $data = Mixi::gender();
    return propReturn($param, $data);
}

function month($param = null)
{
    $data = Mixi::month();
    return propReturn($param, $data);
}

function weekday($param = null)
{
    $data = Mixi::weekday();
    return propReturn($param, $data);
}
function propReturn($param = null, $data = null)
{
    if (isset($data[0]['id'])) {
        if (is_numeric($param)) {
            $index = array_search($param, array_column($data, 'id'));

            if ($index === false) {
                exit("Index not found");
            }

            return $data[$index]['key'];
        } elseif (is_string($param)) {
            $index = array_search($param, array_column($data, 'key'));

            if ($index === false) {
                exit("Index not found");
            }

            return $data[$index]['id'];
        } else {
            return $data;
        }
    }

    if (is_numeric($param)) {
        return $data[$param];
    } elseif (is_string($param)) {
        return array_search($param, $data);
    } else {
        return setKeyNameId($data);
    }
}

function setKeyNameId($data)
{
    $result = [];
    foreach ($data as $key => $value) {

        if (isset($value['name'])) {
            return $data;
        }

        $row = [];
        $row['key'] = $value; // for code purpose
        $ucfirst = ucfirst($value);
        $row['name'] = str_replace('_', ' ', $ucfirst); // For display
        $row['id'] = $key;
        $result[] = $row;
    }
    return $result;
}
