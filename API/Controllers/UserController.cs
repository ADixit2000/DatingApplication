using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace API.Controllers;

[Authorize]
public class UserController(IUserRepository userRepository, IMapper mapper) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers(){

        var users = await userRepository.GetMembersAsync();

        var usersToReturn = mapper.Map<IEnumerable<MemberDto>>(users);

        return Ok(usersToReturn);
    }

    [HttpGet("{username}")]  //api/user/3
    public async Task<ActionResult<MemberDto>> GetUser(string username){

        var user = await userRepository.GetMemberAsync(username);


        if(user == null) return NotFound();
        return mapper.Map<MemberDto>(user);
    }
}
