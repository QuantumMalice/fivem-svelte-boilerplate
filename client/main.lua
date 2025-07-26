if not lib then print('^1ox_lib must be started before this resource.^0') return end

RegisterCommand('openNui', function()
    SendNUIMessage({ action = 'setVisible', data = true })
    SetNuiFocus(true, true)
end, false)

RegisterNUICallback('getCoords', function(_, cb)
    local coords = GetEntityCoords(cache.ped)
    cb({
        x = math.ceil(coords.x),
        y = math.ceil(coords.y),
        z = math.ceil(coords.z)
    })
end)

RegisterNUICallback('close', function(_, cb)
    SetNuiFocus(false, false)
    cb({})
end)